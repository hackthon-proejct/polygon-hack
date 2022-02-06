import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import Board from "../models/Board.model";
import logger from "../utils/logger";
import { BoardType, BountyType } from "./types";

const BoardQueries = {
  board: {
    type: BoardType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Board.findByPk(args.id);
    },
  },
  boards: {
    type: new GraphQLList(BoardType),
    args: {
      limit: {
        type: GraphQLInt,
      },
      order: {
        type: GraphQLString,
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Board.findAll({
        limit: args.limit,
        order: args.order,
      });
    },
  },
};

const BoardMutations = {};

const BoardSubscriptions = {};

export { BoardQueries, BoardMutations, BoardSubscriptions };
