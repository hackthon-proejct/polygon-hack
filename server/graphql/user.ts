import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Op } from "sequelize";
import Profile from "../models/Profile.model";
import User from "../models/User.model";
import { ProfileType, BoardType } from "./types";

const PublicKeyType = new GraphQLObjectType({
  name: "PublicKey",
  description: "The public key of the user's wallet",
  fields: {
    key: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The base58 encoded public key",
    },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "A single user",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The uuid of this user",
    },
    profile: {
      type: ProfileType,
      description: "The user's profile",
      resolve: async (parent, args, ctx, info) => {
        return await parent.$get("profile");
      },
    },
    publicKey: {
      type: PublicKeyType,
      description: "The user's public key",
      resolve: async (parent, args, ctx, info) => {
        return await parent.$get("public_key");
      },
    },
  },
});

const UserQueries = {
  user: {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await User.findByPk(args.id);
    },
  },
  creators: {
    type: new GraphQLNonNull(new GraphQLList(UserType)),
    args: {},
    resolve: async (parent, args, ctx, info) => {
      return await User.findAll({
        include: [
          {
            model: Profile,
            where: {
              twitter_handle: {
                [Op.ne]: null,
              },
            },
          },
        ],
      });
    },
  },
  lookupTwitterHandle: {
    type: ProfileType,
    args: {
      handle: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Profile.findOne({
        where: {
          twitter_handle: args.handle,
        },
      });
    },
  },
  currentUser: {
    type: UserType,
    description: "The current logged in user",
    resolve: (parent, args, ctx, info) => {
      return ctx.state.user;
    },
  },
  profile: {
    type: ProfileType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (parent, args, ctx, info) => {
      return await Profile.findByPk(args.id);
    },
  },
};

const UserMutations = {
  editUserProfile: {
    type: UserType,
    args: {
      imageUrl: {
        type: GraphQLString,
      },
    },
    resolve: async (parent, args, ctx, info) => {
      const user: User = await User.findByPk(ctx.state.user?.id, {
        include: [{ model: Profile }],
      });
      await user.createProfileIfNotExists();
      if (args.imageUrl) {
        user.profile.image_url = args.imageUrl;
      }

      user.profile.save();
      return user;
    },
  },
};

export { UserType, UserQueries, UserMutations };
