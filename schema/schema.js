const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema
} = graphql;
const _ = require("lodash");

var books = [
  { name: "books A", genre: "GA", id: 1, author_id: 1 },
  { name: "books B", genre: "GB", id: 2, author_id: 2 },
  { name: "books C", genre: "GC", id: 3, author_id: 3 }
];

var authors = [
  { name: "Author A", age: 52, id: 1 },
  { name: "Author B", age: 55, id: 2 },
  { name: "Author C", age: 59, id: 3 }
];

const IdType = { type: GraphQLID };
const IntType = { type: GraphQLInt };
const StringType = { type: GraphQLString };

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: IdType,
    name: StringType,
    genre: StringType,
    author: {
      type: AuthorType,
      resolve(source, args) {
        return _.find(authors, { id: parseInt(source.author_id) });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: IdType,
    name: StringType,
    age: IntType
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: IdType
      },
      resolve(source, args) {
        //Some logic to grab data from resource/db
        return _.find(books, { id: parseInt(args.id) });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: IdType
      },
      resolve(source, args) {
        //Some logic to grab data from resource/db
        return _.find(authors, { id: parseInt(args.id) });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
