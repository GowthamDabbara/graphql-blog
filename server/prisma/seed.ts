import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Clear existing data
	await prisma.comment.deleteMany();
	await prisma.post.deleteMany();
	await prisma.user.deleteMany();

	// Create users
	const user1 = await prisma.user.create({
		data: {
			email: "alice@example.com",
			name: "Alice Chen",
			bio: "Tech blogger and GraphQL enthusiast",
		},
	});

	const user2 = await prisma.user.create({
		data: {
			email: "bob@example.com",
			name: "Bob Smith",
			bio: "Full-stack developer",
		},
	});

	// Create posts
	const post1 = await prisma.post.create({
		data: {
			title: "Getting Started with GraphQL",
			slug: "getting-started-graphql",
			content:
				"GraphQL is a query language for APIs. In this post, we explore the basics and benefits of GraphQL over REST.",
			excerpt: "Learn GraphQL fundamentals",
			published: true,
			authorId: user1.id,
		},
	});

	const post2 = await prisma.post.create({
		data: {
			title: "React Hooks Deep Dive",
			slug: "react-hooks-deep-dive",
			content:
				"React Hooks revolutionized how we write components. Let's dive deep into useState, useEffect, and custom hooks.",
			excerpt: "Master React Hooks",
			published: true,
			authorId: user1.id,
		},
	});

	// Create comment
	await prisma.comment.create({
		data: {
			content: "Great article! Really helped me understand GraphQL.",
			postId: post1.id,
			authorId: user2.id,
		},
	});

	console.log("✅ Database seeded successfully!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
