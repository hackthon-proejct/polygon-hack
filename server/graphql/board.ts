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
import { BountyType } from "./bounty";
import { ProfileType } from "./types";

const BoardType = new GraphQLObjectType({
  name: "Board",
  description: "A bounty board",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    metadata: {
      type: GraphQLJSONObject,
      description: "The metadata of this board",
    },
    claimed: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    bounties: {
      type: new GraphQLList(BountyType),
      resolve: async (parent, args, ctx, info) => {
        return await parent.$get("bounties");
      },
    },
    creator: {
      type: ProfileType,
      resolve: async (parent, args, ctx, info) => {
        return await parent.$get("profile");
      },
    },
  },
});

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

export { BoardType, BoardQueries, BoardMutations, BoardSubscriptions };
