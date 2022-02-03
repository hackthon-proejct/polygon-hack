import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import Board from "../models/Board.model";
import Bounty from "../models/Bounty.model";
import Profile from "../models/Profile.model";
import User from "../models/User.model";

const BountyType = new GraphQLObjectType({
  name: "Bounty",
  description: "A single bounty",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    metadata: {
      type: GraphQLJSONObject,
      description: "The metadata attached to this bounty",
    },
  },
});

const BountyQueries = {
  bounty: {
    type: BountyType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Bounty.findByPk(args.id);
    },
  },
};

const BountyMutations = {
  createBounty: {
    type: BountyType,
    args: {
      metadata: {
        type: new GraphQLNonNull(GraphQLJSONObject),
      },
      board_id: {
        type: GraphQLString,
      },
      twitter_handle: {
        type: GraphQLString,
      },
    },
    resolve: async (parent, args, ctx, info) => {
      let boardId = args.board_id;
      if (!boardId) {
        // create new creator user acc and board
        const user = await User.create({});
        await Profile.create({
          twitter_handle: args.twitter_handle,
          user_id: user.id,
        });
        const board = await Board.create({
          user_id: user.id,
        });
        boardId = board.id;
      }
      return await Bounty.create({
        metadata: args.metadata,
        user_id: ctx.state.user.id,
        board_id: boardId,
      });
    },
  },
};

export { BountyType, BountyQueries, BountyMutations };
