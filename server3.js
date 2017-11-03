'use strict';

const { graphql, buildSchema } = require ('graphql');

const schema = buildSchema(`
    type Video {
      id: ID,
      tittle: String,
      duration: Int,
      watched: Boolean
    }
    type Query {
      video: Video
    }

    type schema {
      query: Query
    }
`);

const resolvers = {
  video: () => ({
    id: '1',
    tittle: 'Foo',
    duration: 180,
    watched: true,
  }),
};


const query = `
  query myFirstQuery {
    video {
      id,
      tittle,
      duration,
      watched
    }
  }`;


graphql(schema, query, resolvers)
      .then((result) => console.log(result))
      .catch((err) => console.log(error));
