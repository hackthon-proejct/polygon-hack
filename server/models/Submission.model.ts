import {
  Table,
  Column,
  Model,
  CreatedAt,
  BelongsTo,
  ForeignKey,
  UpdatedAt,
  Default,
  DataType,
  PrimaryKey,
} from "sequelize-typescript";
import fetch from "node-fetch";
import { v4 } from "uuid";
import { uploadToCloudFS } from "../utils/smart_contracts/upload/helpers";
import Bounty from "./Bounty.model";
import { mintSubmission } from "../utils/smart_contracts/toolbox/mint";

export enum SubmissionStatus {
  UNKNOWN = 0,
  PROPOSED = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}

export interface SubmissionMetadata {
  milestone: number;
  image_url: string;
  description: string;
  name: string;
  background_color: string;
  external_url: string;
}

@Table({
  timestamps: true,
  tableName: "submissions",
  underscored: true,
})
export default class Submission extends Model {
  static Bounty;

  @Default(v4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;

  @Column(DataType.JSON)
  metadata: SubmissionMetadata;

  @Column(DataType.INTEGER)
  status: SubmissionStatus;

  @ForeignKey(() => Bounty)
  @Column
  bounty_id: string;

  @BelongsTo(() => Bounty, "bounty_id")
  bounty: Bounty;

  async mint() {
    const bounty = await this.$get("bounty");
    const metadata = {
      description: this.metadata.description,
      name: this.metadata.name,
      background_color: this.metadata.background_color,
      external_url: this.metadata.external_url,
      youtube_url: bounty.metadata.youtube_url,
    };
    const filename = encodeURIComponent(`${this.id}`).replaceAll("%", "");
    const resp = await fetch(this.metadata.image_url);
    const result = await uploadToCloudFS(
      filename,
      await resp.buffer(),
      metadata,
      "pinata"
    );

    const tokenAddr = await mintSubmission(bounty.address, result.link);
    await mintSubmission(bounty.address, this.metadata.image_url);
    bounty.metadata = {
      ...bounty.metadata,
      ipfs_manifest: result.link,
      token_addr: tokenAddr,
    };
    await bounty.save();
    return;
  }
}
