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
import { v4 } from "uuid";
import Bounty from "./Bounty.model";

export enum SubmissionStatus {
  UNKNOWN = 0,
  PROPOSED = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}

export interface SubmissionMetadata {
  milestone: number;
  image_url: string;
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
}
