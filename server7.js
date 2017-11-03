'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
} = require ('graphql');

const { getVideoById } = require('./src/data/server7');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'A video on Youtube',
  fields:{
    id:{
      type: GraphQLID,
      description: 'The id of the video.',
    },

    title:{
      type: GraphQLString,
      description: 'The title of the video.',
    },

    duration:{
      type: GraphQLInt,
      description: 'The duration of the video(in seconds).',
    },

    watched:{
      type: GraphQLBoolean,
      description: 'whether or not the viewer has watched the video.',
    },

  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    video: {
      type: videoType,
      args: {
        id: {
          type: GraphQLID,
          description:' The id of the video.',
        }
      },
      // resolve: () => new Promise((resolve) => {
      //   resolve({
      //     id: 'a',
      //     title: 'GraphQL',
      //     duration: 180,
      //     watched: false,
      //   });
      // }),
      resolve: (_, args) => {
        return getVideoById(args.id);
      }
    },
  }
});

const schema = new GraphQLSchema({
  query: queryType,
});

// const videoA = {
//   id: 'a',
//   title: 'Create a GraphQL Schema',
//   duration: 120,
//   watched:true,
// };
//
// const videoB = {
//   id: 'b',
//   title: 'Ember.js CLI',
//   duration: 240,
//   watched:false,
// };
//
// const videos = [videoA, videoB];


server.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true,

}));

server.listen(PORT, () =>{
  console.log(`Listening on http://localhost:${PORT}`);
});
