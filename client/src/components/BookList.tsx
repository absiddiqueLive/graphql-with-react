import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/BookQueries";
import { IBook } from "../interfaces/BookInterfaces";
import BookDetails from "./BookDetails";

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
        <BookDetails />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
