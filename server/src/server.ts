import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";

import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { prisma } from "./db/prisma";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({
			prisma,
		}),
	});

	const app: Express = express();

	app.use(cors());
	app.use(express.json());

	await server.start();

	server.applyMiddleware({ app: app as any });

	app.get("/health", (_req, res) => {
		res.json({ status: "Server is running! 🚀" });
	});

	app.get("/", (_req, res) => {
		res.json({
			message: "GraphQL Blog API",
			graphql: `http://localhost:${PORT}${server.graphqlPath}`,
		});
	});

	app.listen(PORT, () => {
		console.log(`
✅ Server running at http://localhost:${PORT}
📊 GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}
    `);
	});
}

startServer().catch((error) => {
	console.error("Failed to start server:", error);
	process.exit(1);
});
