import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/index.js";
import { connectDB } from "./config/db.js";
import { graphqlMiddleware } from "./middleware/globalMiddleware.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const schema = makeExecutableSchema({ typeDefs, resolvers });
const schemaWithMiddleware = applyMiddleware(schema, graphqlMiddleware);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  context: ({ req }) => {
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
    res.send(
      "The Product Highway Assigment ! use /graphql route and then you can make API call"
    );
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
