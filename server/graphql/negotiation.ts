import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import Bounty, { BountyStatus } from "../models/Bounty.model";
import Negotiation, { NegotiationStatus } from "../models/Negotiation.model";
import User from "../models/User.model";
import Web3PublicKey from "../models/Web3PublicKey.model";
import logger from "../utils/logger";
import {
  negotiateBounty,
  negotiateRejoin,
  precipitatingEvent,
} from "../utils/smart_contracts/toolbox/bounty";
import { BountyType, NegotiationType } from "./types";

const NegotiationQueries = {
  negotiation: {
    type: NegotiationType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Negotiation.findByPk(args.id);
    },
  },
  negotiations: {
    type: new GraphQLList(NegotiationType),
    args: {
      limit: {
        type: GraphQLInt,
      },
      order: {
        type: GraphQLString,
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Negotiation.findAll({
        limit: args.limit,
        order: args.order,
      });
    },
  },
  negotiationForBounty: {
    type: NegotiationType,
    args: {
      bounty_id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Negotiation.findOne({
        where: { bounty_id: args.bounty_id },
      });
    },
  },
};

const NegotiationMutations = {
  createNegotiation: {
    type: NegotiationType,
    args: {
      bounty_id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      metadata: {
        type: new GraphQLNonNull(GraphQLJSONObject),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      const existing = await Negotiation.findOne({
        where: { bounty_id: args.bounty_id },
      });
      if (existing) {
        return existing;
      }
      const bounty = await Bounty.findByPk(args.bounty_id);
      if (!(bounty && bounty.status == BountyStatus.UNCLAIMED)) {
        return null;
      }
      const negotiation = await Negotiation.create({
        bounty_id: args.bounty_id,
        metadata: args.metadata,
        status: NegotiationStatus.PROPOSED,
      });
      bounty.status = BountyStatus.NEGOTIATING;
      bounty.block_metadata = {
        ...bounty.block_metadata,
        reservePrice: args.metadata.reservePrice,
        timeLimit: args.metadata.timeLimit,
      };
      await bounty.save();
      await negotiateBounty(bounty.address, bounty.block_metadata);

      return negotiation;
    },
  },
  rejoinBounty: {
    type: BountyType,
    args: {
      bounty_id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      const bounty = await Bounty.findByPk(args.bounty_id);
      const user = await User.findByPk(ctx.state.user.id, {
        include: Web3PublicKey,
      });
      await negotiateRejoin(bounty.address, user.public_key.key);
      return bounty;
    },
  },
};

const NegotiationSubscriptions = {};

export {
  NegotiationType,
  NegotiationQueries,
  NegotiationMutations,
  NegotiationSubscriptions,
};
