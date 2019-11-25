import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const getAuthorQuery = gql`
  {
    authors {
      id
      name
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

class AddBook extends React.Component<any> {
  displayAuthor() {
    let data = this.props.data;

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

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label>Book Name</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author</label>
          <select>
            <option>Select Author</option>
            {this.displayAuthor()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorQuery)(AddBook);
