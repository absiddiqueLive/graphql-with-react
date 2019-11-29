import gql from "graphql-tag";

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

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

export { getBookQuery, getBooksQuery, getAuthorsQuery, addBookMutation };
