import { GraphQLContext } from "../../types/index";

export const typeResolvers = {
	Post: {
		author: async (parent: any, _args: any, context: GraphQLContext) => {
			return context.prisma.user.findUnique({
				where: { id: parent.authorId },
			});
		},
		comments: async (parent: any, _args: any, context: GraphQLContext) => {
			return context.prisma.comment.findMany({
				where: { postId: parent.id },
			});
		},
	},

	User: {
		posts: async (parent: any, _args: any, context: GraphQLContext) => {
			return context.prisma.post.findMany({
				where: { authorId: parent.id },
			});
		},
		comments: async (parent: any, _args: any, context: GraphQLContext) => {
			return context.prisma.comment.findMany({
				where: { authorId: parent.id },
			});
		},
	},

	Comment: {
		post: async (parent: any, _args: any, context: GraphQLContext) => {
			return context.prisma.post.findUnique({
				where: { id: parent.postId },
			});
		},
		author: async (parent: any, _args: any, context: GraphQLContext) => {
			return context.prisma.user.findUnique({
				where: { id: parent.userId }, // ← Change this from authorId
			});
		},
	},
};
