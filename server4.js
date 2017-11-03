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
      videos: [Video ]
    }

    type schema {
      query: Query
    }
`);

const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  watched:true,
};

const videoB = {
  id: 'b',
  title: 'Ember.js CLI',
  duration: 240,
  watched:false,
};

const videos = [videoA, videoB];

const resolvers = {
  video: () => ({
    id: '1',
    tittle: 'Foo',
    duration: 180,
    watched: true,
  }),
  videos: () => videos,
};


const query = `
  query myFirstQuery {
    videos {
      id,
      tittle,
      duration,
      watched
    }
  }`;


graphql(schema, query, resolvers)
      .then((result) => console.log(result))
      .catch((err) => console.log(error));
