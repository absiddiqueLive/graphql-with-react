import React from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { IAuthor } from "../interfaces/AuthorInterfaces";
import { StateBook } from "../interfaces/BookInterfaces";
import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation
} from "../queries/BookQueries";

class AddBook extends React.Component<any, StateBook> {
  emptyBook = {
    name: "",
    genre: "",
    authorId: ""
  };
  constructor(props: any) {
    super(props);
    this.state = this.emptyBook;
  }
  
  displayAuthor() {
    let data = this.props.getAuthorsQuery;

    if (data.loading) {
      return <option>Author Loading ....</option>;
    }

    return data.authors.map((author: IAuthor) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }

  submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: this.state,
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState(this.emptyBook);
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              this.setState({ name: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            value={this.state.genre}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              this.setState({ genre: e.target.value })
            }
          />
        </div>

        <div className="field">
          <label>Author</label>
          <select
            value={this.state.authorId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              this.setState({ authorId: e.target.value })
            }
          >
            <option>Select Author</option>
            {this.displayAuthor()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
