/* eslint-disable */
const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, id) => links.filter((val) => val.id === id.id)[0],
  },
  Mutation: {
    post: (_, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
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
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
