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
import Profile from "./Profile.model";

@Table({
  timestamps: true,
  tableName: "boards",
  underscored: true,
})
export default class Board extends Model {
  static Profile;
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

  @Column(DataType.BOOLEAN)
  claimed: boolean;

  @ForeignKey(() => Profile)
  @Column
  profile_id: string;

  @BelongsTo(() => Profile, "profile_id")
  profile: Profile;

  @HasMany(() => Bounty, "board_id")
  bounties: Bounty[];
}
