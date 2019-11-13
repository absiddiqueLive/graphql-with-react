const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLSchema
} = graphql;
const _ = require("lodash");

var books = [
  { name: "books A", genre: "GA", id: 1, author_id: 1 },
  { name: "books B", genre: "GB", id: 2, author_id: 2 },
  { name: "books C", genre: "GC", id: 3, author_id: 3 },
  { name: "books A2", genre: "GA", id: 4, author_id: 1 },
  { name: "books B2", genre: "GB", id: 5, author_id: 2 },
  { name: "books C2", genre: "GC", id: 6, author_id: 2 }
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
    age: IntType,
    books: {
      type: new GraphQLList(BookType),
      resolve(source, args) {
        return _.filter(books, { author_id: parseInt(source.id) });
      }
    }
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(source, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(source, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
