import gql from "graphql-tag";

const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, author_id: $authorId) {
      id
      name
    }
  }
`;

export { getBooksQuery, getAuthorsQuery, addBookMutation };
