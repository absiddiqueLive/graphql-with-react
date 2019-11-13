const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

const dbUrl =
  "mongodb+srv://username:password@graphql-test-bmys9.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbUrl);
mongoose.connection.once("open", () => {
  console.log("Connection established with DB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("I am running at port 4000");
});
