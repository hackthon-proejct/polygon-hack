import {
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import Board from "../models/Board.model";
import Bounty, { BountyStatus } from "../models/Bounty.model";
import Profile from "../models/Profile.model";
import { BountyType } from "./types";

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

  bounties: {
    type: new GraphQLList(BountyType),
    args: {
      limit: {
        type: GraphQLInt,
      },
      order: {
        type: GraphQLString,
      },
      onlyMine: {
        type: GraphQLBoolean,
      },
    },
    resolve: async (parent, args, ctx, info) => {
      const params = {
        limit: args.limit,
        order: args.order,
      };
      if (args.onlyMine) {
        params["where"] = {
          user_id: ctx.state.user.id,
        };
      }
      return await Bounty.findAll(params);
    },
  },

  bounties_by_user: {
    type: new GraphQLList(BountyType),
    args: {
      id: {
        description: "uuid of the user",
        type: new GraphQLNonNull(GraphQLString),
      },
      limit: {
        type: GraphQLInt,
      },
      order: {
        type: GraphQLString,
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Bounty.findAll({
        where: {
          user_id: args.id,
        },
        limit: args.limit,
        order: args.order,
      });
    },
  },
};

const BountyMutations = {
  createBounty: {
    type: BountyType,
    args: {
      block_metadata: {
        type: new GraphQLNonNull(GraphQLJSONObject),
      },
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
        let maybeProfile = await Profile.findOne({
          where: {
            twitter_handle: args.twitter_handle,
          },
          include: Board,
        });
        if (!maybeProfile) {
          // create new creator profile
          maybeProfile = await Profile.create(
            {
              twitter_handle: args.twitter_handle,
            },
            { include: Board }
          );
        }
        // Board is already set
        if (maybeProfile.board) {
          boardId = maybeProfile.board.id;
        } else {
          const board = await Board.create({
            profile_id: maybeProfile.id,
            claimed: true,
          });
          boardId = board.id;
        }
      }

      return await Bounty.create({
        block_metadata: args.block_metadata,
        metadata: args.metadata,
        user_id: ctx.state.user.id,
        board_id: boardId,
        status: BountyStatus.DRAFT,
      });
    },
  },
  publishBounty: {
    type: BountyType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      const bounty = await Bounty.findByPk(args.id);
      return await bounty.publish();
    },
  },
  claimBounty: {
    type: BountyType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      const bounty = await Bounty.findByPk(args.id);
      return await bounty.claim();
    },
  },
};

export { BountyQueries, BountyMutations };
