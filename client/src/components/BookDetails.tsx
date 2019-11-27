import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/BookQueries";

class BookDetails extends React.Component {
  
  render() {
    return (
      <div id="book-details">
        <p>Book Details will be shown here !</p>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookDetails);
