import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/schemas/userSchema.js";
import { connectDB } from "./config/db.js";
import { graphqlMiddleware } from "./graphql/resolvers/userResolvers.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(
  { typeDefs, resolvers }
)



const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, graphqlMiddleware);

// Create the Apollo server
const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }) => {
    // Get the authorization header
    const token = req.headers.authorization || "";
    return {
      token,
    };
  },
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
