const _ = require("lodash");
const graphql = require("graphql");
const Book = require("../models/books");
const Author = require("../models/author");

const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const IdType = { type: GraphQLID };
const IntType = { type: GraphQLInt };
const StringType = { type: GraphQLString };
const NonNullIdType = { type: new GraphQLNonNull(GraphQLID) };
const NonNullIntType = { type: new GraphQLNonNull(GraphQLInt) };
const NonNullStringType = { type: new GraphQLNonNull(GraphQLString) };

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: IdType,
    name: StringType,
    genre: StringType,
    author: {
      type: AuthorType,
      resolve(source, args) {
        // return _.find(authors, { id: parseInt(source.author_id) });
        return Author.findById(source.author_id);
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
        // return _.filter(books, { author_id: parseInt(source.id) });
        return Book.find({
          author_id: source.id
        });
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
        // return _.find(books, { id: parseInt(args.id) });
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: IdType
      },
      resolve(source, args) {
        //Some logic to grab data from resource/db
        // return _.find(authors, { id: parseInt(args.id) });
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(source, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(source, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: NonNullStringType,
        age: NonNullIntType
      },
      resolve(source, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: NonNullStringType,
        genre: NonNullStringType,
        author_id: NonNullIdType
      },
      resolve(source, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          author_id: args.author_id
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
