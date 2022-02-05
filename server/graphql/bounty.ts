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

const BountyData = new GraphQLObjectType({
  name: "BountyData",
  fields: {
    creatorWallet: {
      type: GraphQLString,
      description: "The wallet address of the creator, assigned on publish",
    },
    maxValue: {
      type: new GraphQLNonNull(GraphQLString),
      description:
        "1000000000 = 1 gwei, the price at which this bounty is no longer joinable",
    },
    reservePrice: {
      type: new GraphQLNonNull(GraphQLString),
      description:
        "1000000000 = 1 gwei, the price this bounty must be at to be claimable",
    },
    bonusTargets: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "[20,20] if 20% of the funds are disbursed in m0 and m1",
    },
    bonusPctYeasNeeded: {
      type: new GraphQLNonNull(GraphQLInt),
      description:
        "[40,40] if 40% if the vote needs to be yea to pass milestones 0 and 1",
    },
    bonusFailureThresholds: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "[1,2] if milestone 0 can fail 1 time and m1 can fail twice",
    },
    mustBeClaimedTime: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "Datetime when this must be claimed or expires",
    },
    timeLimit: {
      type: new GraphQLNonNull(GraphQLInt),
      description:
        "Time in seconds the creator has to finish this when claimed",
    },
  },
});

const BountyType = new GraphQLObjectType({
  name: "Bounty",
  description: "A single bounty",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    metadata: {
      type: new GraphQLNonNull(BountyData),
      description: "The metadata attached to this bounty",
    },
    address: {
      type: GraphQLString,
      description: "The contract address for this bounty",
    },
    status: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    initiator_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The funder that initiated this bounty",
      resolve: async (parent, args, ctx, info) => {
        const user = await parent.$get("user");
        return user.id;
      },
    },
    creator_id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The creator who can claim this bounty",
      resolve: async (parent, args, ctx, info) => {
        const board = await parent.$get("board");
        const profile = await Profile.findOne({
          where: {
            id: board.profile_id,
          },
        });
        return profile.user_id;
      },
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
          });
          boardId = board.id;
        }
      }

      return await Bounty.create({
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

export { BountyType, BountyQueries, BountyMutations };
