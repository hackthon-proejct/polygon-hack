import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import Profile from "../models/Profile.model";

export const BountyData = new GraphQLObjectType({
  name: "BountyData",
  fields: {
    creatorWallet: {
      type: GraphQLString,
      description: "The wallet address of the creator, assigned on publish",
    },
    maxValue: {
      type: new GraphQLNonNull(GraphQLFloat),
      description:
        "The price in ETH at which this bounty is no longer joinable",
    },
    reservePrice: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "The price in ETH this bounty must be at to be claimable",
    },
    bonusTargets: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
      description: "[20,20] if 20% of the funds are disbursed in m0 and m1",
    },
    bonusPctYeasNeeded: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
      description:
        "[40,40] if 40% if the vote needs to be yea to pass milestones 0 and 1",
    },
    bonusFailureThresholds: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLInt))),
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

export const BountyType = new GraphQLObjectType({
  name: "Bounty",
  description: "A single bounty",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    block_metadata: {
      type: new GraphQLNonNull(BountyData),
      description: "The blockchain metadata attached to this bounty",
    },
    metadata: {
      type: new GraphQLNonNull(GraphQLJSONObject),
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
        return parent.user_id;
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

export const BoardType = new GraphQLObjectType({
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
  },
});

export const NegotiationType = new GraphQLObjectType({
  name: "Negotiation",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    metadata: {
      type: GraphQLJSONObject,
      description: "The metadata of this negotiation",
    },
    status: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    bounty: {
      type: new GraphQLNonNull(BountyType),
      resolve: async (parent, args, ctx, info) => {
        return await parent.$get("bounty");
      },
    },
  },
});

export const ProfileType = new GraphQLObjectType({
  name: "Profile",
  description: "The profile attached to a user",
  fields: {
    twitter_handle: {
      type: GraphQLString,
    },
    image_url: {
      type: GraphQLString,
    },
    user_id: {
      type: GraphQLString,
    },
    board: {
      type: BoardType,
      resolve: async (parent, args, ctx, info) => {
        return await parent.$get("board");
      },
    },
  },
});
