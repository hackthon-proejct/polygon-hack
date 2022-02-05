import { Sequelize } from "sequelize-typescript";
import config from "../../config";
import User from "./User.model";
import Board from "./Board.model";
import Web3PublicKey from "./Web3PublicKey.model";
import Bounty from "./Bounty.model";
import Profile from "./Profile.model";

export default function init() {
  const sequelize = new Sequelize(
    config.mysql.DATABASE,
    config.mysql.USER,
    config.mysql.PASSWORD,
    {
      host: config.mysql.HOST,
      dialect: "mariadb",
      pool: {
        max: 4,
        min: 0,
        idle: 30000,
      },
      logging: false,
    }
  );

  sequelize.addModels([User, Bounty, Board, Web3PublicKey, Profile]);
  postInit();
  return sequelize;
}

// This sucks, what even is this
function postInit() {
  Board.Bounties = Board.hasMany(Bounty);
  Board.Profile = Board.belongsTo(Profile);
  Bounty.User = Bounty.belongsTo(User);
  Bounty.Board = Bounty.belongsTo(Board);
  User.Profile = User.hasOne(Profile);
  User.PublicKey = User.hasOne(Web3PublicKey);
  User.Bounties = User.hasMany(Bounty);
  Profile.User = Profile.belongsTo(User);
  Profile.Board = Profile.hasOne(Board);
}
