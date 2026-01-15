import { GraphQLContext } from "../../types/index";

export const mutationResolvers = {
	Mutation: {
		createUser: async (
			_parent: any,
			args: { input: { email: string; name: string; bio?: string } },
			context: GraphQLContext
		) => {
			return context.prisma.user.create({
				data: {
					email: args.input.email,
					name: args.input.name,
					bio: args.input.bio,
				},
			});
		},

		createPost: async (
			_parent: any,
			args: {
				input: {
					title: string;
					slug: string;
					content: string;
					excerpt?: string;
					authorId: number;
					published?: boolean;
				};
			},
			context: GraphQLContext
		) => {
			return context.prisma.post.create({
				data: {
					title: args.input.title,
					slug: args.input.slug,
					content: args.input.content,
					excerpt: args.input.excerpt,
					authorId: args.input.authorId,
					published: args.input.published ?? true,
				},
			});
		},

		updatePost: async (
			_parent: any,
			args: {
				id: string;
				input: { title?: string; content?: string; excerpt?: string };
			},
			context: GraphQLContext
		) => {
			return context.prisma.post.update({
				where: { id: parseInt(args.id) },
				data: args.input,
			});
		},

		deletePost: async (
			_parent: any,
			args: { id: string },
			context: GraphQLContext
		) => {
			await context.prisma.post.delete({
				where: { id: parseInt(args.id) },
			});
			return true;
		},

		publishPost: async (
			_parent: any,
			args: { id: string; published: boolean },
			context: GraphQLContext
		) => {
			return context.prisma.post.update({
				where: { id: parseInt(args.id) },
				data: { published: args.published },
			});
		},

		createComment: async (
			_parent: any,
			args: {
				input: { content: string; postId: number; authorId: number };
			},
			context: GraphQLContext
		) => {
			return context.prisma.comment.create({
				data: {
					content: args.input.content,
					postId: args.input.postId,
					authorId: args.input.authorId,
				},
			});
		},

		deleteComment: async (
			_parent: any,
			args: { id: string },
			context: GraphQLContext
		) => {
			await context.prisma.comment.delete({
				where: { id: parseInt(args.id) },
			});
			return true;
		},
	},
};
