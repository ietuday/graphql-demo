'use strict';

const { graphql, buildSchema } = require ('graphql');

const schema = buildSchema(`
    type Query {
      id: ID,
      tittle: String,
      duration: Int,
      watched: Boolean
    }

    type schema {
      query: Query
    }
`);

const resolvers = {
  id: () => '1',
  title: () => 'bar',
  duration: () => 180,
  watched: () => true
};


const query = `
  query myFirstQuery {
    id
    tittle
    duration
    watched
  }`;


graphql(schema, query, resolvers)
      .then((result) => console.log(result))
      .catch((err) => console.log(error));
