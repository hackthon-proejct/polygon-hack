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

export enum NegotiationStatus {
  UNKNOWN = 0,
  PROPOSED = 1,
  ACCEPTED = 2,
  REJECTED = 3,
}

@Table({
  timestamps: true,
  tableName: "negotiations",
  underscored: true,
})
export default class Negotiation extends Model {
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
  metadata: any;

  @Column(DataType.INTEGER)
  status: NegotiationStatus;

  @ForeignKey(() => Bounty)
  @Column
  bounty_id: string;

  @BelongsTo(() => Bounty, "bounty_id")
  bounty: Bounty;
}
