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
import {
  claimBounty,
  createBounty,
} from "../utils/smart_contracts/toolbox/bounty";
import { BountyData } from "../utils/smart_contracts/toolbox/types";
import Profile from "./Profile.model";
import Web3PublicKey from "./Web3PublicKey.model";

class NoCreatorFound extends Error {}
class IncorrectStatus extends Error {}

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
  block_metadata: BountyData;

  @Column(DataType.JSON)
  metadata: BountyData;

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
    if (this.status != BountyStatus.DRAFT) {
      throw new IncorrectStatus();
    }
    // Find the creator wallet here
    const board = await Board.findByPk(this.board_id, {
      include: [
        {
          model: Profile,
          include: [
            {
              model: User,
              include: [Web3PublicKey],
            },
          ],
        },
      ],
    });
    if (!(board.profile.user && board.profile.user.public_key)) {
      throw new NoCreatorFound();
    }
    this.block_metadata = {
      ...this.block_metadata,
      creatorWallet: board.profile.user.public_key.key,
    };
    const resp = await createBounty(this.block_metadata);
    this.address = resp.address;
    this.status = BountyStatus.UNCLAIMED;
    await this.save();
    return this;
  }

  async claim(): Promise<Bounty> {
    if (this.status != BountyStatus.UNCLAIMED) {
      throw new IncorrectStatus();
    }
    await claimBounty(this.address);
    this.status = BountyStatus.CLAIMED;
    await this.save();
    return this;
  }
}
