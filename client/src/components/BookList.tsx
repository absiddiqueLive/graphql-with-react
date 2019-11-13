import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const getBookQuery = gql`
  {
    books {
      id
      name
      genre
    }
  }
`;

interface IAuthor {
  id: string;
  name: string;
  age: number;
}

interface IBook {
  id: string;
  name: string;
  genre: string;
  author: IAuthor;
}

interface PropBook {
  data: any;
}

class BookList extends React.Component<any> {
  showBooks() {
    let data = this.props.data;

    if (data.loading) {
      return <div>loading books ....</div>;
    } else {
      return data.books.map((book: IBook) => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.showBooks()}</ul>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
