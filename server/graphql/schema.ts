import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { BoardMutations, BoardQueries, BoardSubscriptions } from "./board";
import { BountyMutations, BountyQueries } from "./bounty";
import { UserQueries, UserMutations } from "./user";

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: Object.assign(BoardQueries, BountyQueries, UserQueries),
});
const rootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: Object.assign(BoardMutations, BountyMutations, UserMutations),
});

let schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
  //   subscription: new GraphQLObjectType({
  //     name: "RootSubscription",
  //     fields: Object.assign(BoardSubscriptions),
  //   }),
});

// const checkAuth = async (resolve, root, args, ctx, info) => {
//   if (!ctx.state.user) {
//     return null;
//   }
//   const result = await resolve(root, args, ctx, info);
//   return result;
// };

// schema = applyMiddleware(schema, checkAuth);

export default schema;
