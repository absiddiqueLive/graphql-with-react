import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/BookQueries";
import { IBook } from "../interfaces/BookInterfaces";
import BookDetails from "./BookDetails";

export interface stateCurrentBook {
  selected: string | null;
}

class BookList extends React.Component<any, stateCurrentBook> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: null
    };
  }

  showBooks() {
    let data = this.props.data;

    if (data.loading) {
      return <div>loading books ....</div>;
    } else {
      return data.books.map((book: IBook) => {
        return (
          <li
            key={book.id}
            onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
              this.setState({
                selected: book.id
              });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.showBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
