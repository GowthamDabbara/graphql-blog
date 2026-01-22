import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Seeding database...");

	// Create a user
	const user = await prisma.user.create({
		data: {
			email: "alice@example.com",
			name: "Alice Johnson",
			bio: "Tech enthusiast and blogger",
		},
	});

	console.log("✅ User created:", user.name);

	// Create posts
	const post1 = await prisma.post.create({
		data: {
			title: "Getting Started with GraphQL",
			slug: "getting-started-with-graphql",
			content:
				"GraphQL is a query language for APIs and a runtime for executing those queries with your existing data. It provides a complete and understandable description of the data in your API.",
			published: true,
			authorId: user.id,
		},
	});

	const post2 = await prisma.post.create({
		data: {
			title: "Why TypeScript is Amazing",
			slug: "why-typescript-is-amazing",
			content:
				"TypeScript adds static typing to JavaScript, making it easier to catch errors early and write more maintainable code. It has become an essential tool for modern web development.",
			published: true,
			authorId: user.id,
		},
	});

	console.log("✅ Posts created:", post1.title, post2.title);

	console.log("🎉 Seeding complete!");
}

main()
	.catch((e) => {
		console.error("❌ Seeding failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
