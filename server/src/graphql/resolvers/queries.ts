import { GraphQLContext } from "../../types/index";

export const queryResolvers = {
	Query: {
		posts: async (
			_parent: any,
			args: { published?: boolean },
			context: GraphQLContext
		) => {
			return context.prisma.post.findMany({
				where:
					args.published !== undefined ? { published: args.published } : {},
				orderBy: { createdAt: "desc" },
			});
		},

		post: async (
			_parent: any,
			args: { id: string },
			context: GraphQLContext
		) => {
			return context.prisma.post.findUnique({
				where: { id: parseInt(args.id) },
			});
		},

		postBySlug: async (
			_parent: any,
			args: { slug: string },
			context: GraphQLContext
		) => {
			return context.prisma.post.findUnique({
				where: { slug: args.slug },
			});
		},

		users: async (_parent: any, _args: any, context: GraphQLContext) => {
			return context.prisma.user.findMany();
		},

		user: async (
			_parent: any,
			args: { id: string },
			context: GraphQLContext
		) => {
			return context.prisma.user.findUnique({
				where: { id: parseInt(args.id) },
			});
		},

		comments: async (_parent: any, _args: any, context: GraphQLContext) => {
			return context.prisma.comment.findMany();
		},

		postComments: async (
			_parent: any,
			args: { postId: string },
			context: GraphQLContext
		) => {
			return context.prisma.comment.findMany({
				where: { postId: parseInt(args.postId) },
			});
		},
	},
};
