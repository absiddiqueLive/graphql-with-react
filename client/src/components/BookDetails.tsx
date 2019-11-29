import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/BookQueries";
import { IBook } from "../interfaces/BookInterfaces";

class BookDetails extends React.Component<any> {
  displayBook() {
    const { book } = this.props.data;

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>Books by author:</p>
          <ul className="other-books">
            {book.author.books.map((book: IBook) => {
              return <li key={book.id}>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected ...!</div>;
    }
  }

  render() {
    return <div id="book-details">{this.displayBook()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: (props: any) => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
