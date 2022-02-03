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
import User from "./User.model";
import Board from "./Board.model";
import { createBounty } from "../utils/smart_contracts/toolbox/bounty";
import { BountyData } from "../utils/smart_contracts/toolbox/types";
import Web3PublicKey from "./Web3PublicKey.model";

export enum BountyStatus {
  UNKNOWN = 0,
  DRAFT = 1,
  UNCLAIMED = 2,
  NEGOTIATING = 3,
  CLAIMED = 4,
  SUCCEEDED = 5,
  FAILED = 6,
  REJECTED = 7,
}
@Table({
  timestamps: true,
  tableName: "bounties",
  underscored: true,
})
export default class Bounty extends Model {
  static Board;
  static User;

  @Default(v4)
  @PrimaryKey
  @Column(DataType.UUID)
  id: string;
  @CreatedAt
  created_at!: Date;
  @UpdatedAt
  updated_at!: Date;

  @Column(DataType.INTEGER)
  status: BountyStatus;

  @Column(DataType.JSON)
  metadata: any;

  @Column(DataType.STRING)
  address: string;

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @ForeignKey(() => Board)
  @Column
  board_id: string;

  @BelongsTo(() => User, "user_id")
  user: User;
  @BelongsTo(() => Board, "board_id")
  board: Board;

  // Publishes to blockchain and returns address as well as saves to db
  async publish(): Promise<Bounty> {
    const resp = await createBounty(this.metadata);
    this.address = resp.address;
    this.status = BountyStatus.UNCLAIMED;
    await this.save();
    return this;
  }
}
