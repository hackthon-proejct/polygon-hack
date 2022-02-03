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
  HasMany,
} from "sequelize-typescript";
import { v4 } from "uuid";
import Bounty from "./Bounty.model";
import User from "./User.model";

@Table({
  timestamps: true,
  tableName: "boards",
  underscored: true,
})
export default class Board extends Model {
  static User;
  static Bounties;

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

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @BelongsTo(() => User, "user_id")
  user: User;

  @HasMany(() => Bounty, "board_id")
  bounties: Bounty[];
}
