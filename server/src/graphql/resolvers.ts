import { queryResolvers } from "./resolvers/queries";
import { mutationResolvers } from "./resolvers/mutations";
import { typeResolvers } from "./resolvers/types";

export const resolvers = {
	Query: queryResolvers.Query,
	Mutation: mutationResolvers.Mutation,
	...typeResolvers,
};
