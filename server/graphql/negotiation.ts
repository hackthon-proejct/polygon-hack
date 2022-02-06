import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import Bounty, { BountyStatus } from "../models/Bounty.model";
import Negotiation from "../models/Negotiation.model";
import logger from "../utils/logger";
import { precipitatingEvent } from "../utils/smart_contracts/toolbox/bounty";
import { NegotiationType } from "./types";

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
      return await Negotiation.findOne({ where: { bounty_id: args.id } });
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
        where: { bounty_id: args.id },
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
      });
      bounty.status = BountyStatus.NEGOTIATING;
      await bounty.save();
      await precipitatingEvent(bounty.address, true);
      return negotiation;
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
