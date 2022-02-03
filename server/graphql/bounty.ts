import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import Bounty from "../models/Bounty.model";

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

const BountyMutations = {};

export { BountyType, BountyQueries, BountyMutations };
