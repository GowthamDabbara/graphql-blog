import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
	uri: "https://graphql-blog-backend-0k8j.onrender.com/graphql",
});

export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
