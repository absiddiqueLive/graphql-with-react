import React from "react";
import BookList from "./components/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./components/AddBook";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h2>Book List</h2>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
