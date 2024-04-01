/* eslint-disable */
const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context, info) => {
      const test = await context.prisma.link.findMany();
      return test;
    },
  },
  Mutation: {
    post: async (_, args, context, info) => {
      const newLink = await context.prisma.link.create({
        data: { url: args.url, description: args.description },
      });
      return newLink;
    },
    updateLink: (_, args) => {
      links = links.map((val) => {
        const validated = args.id == val.id;
        return {
          id: val.id,
          url: validated ? args.url : val.url,
          description: validated ? args.description : val.description,
        };
      });
      return args;
    },
    deleteLink: (_, { id }) => {
      const deleteIndex = links.filter((val) => val.id == id);
      links = links.filter((val) => val.id != id);
      return deleteIndex[0];
    },
  },
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
