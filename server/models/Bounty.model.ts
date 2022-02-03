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

  @Column(DataType.JSON)
  metadata: any;

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
}
