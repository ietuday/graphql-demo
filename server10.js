'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
} = require ('graphql');

const { getVideoById,getVideos, createVideo } = require('./src/data/server7');

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
    videos: {
      type: new GraphQLList(videoType),
      resolve:getVideos,
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
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

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields:{
    createVideo:{
      type:videoType,
      args:{
        title:{
          type: new GraphQLNonNull(GraphQLString),
          description:'The title of the video',
        },
        duration:{
          type: new GraphQLNonNull(GraphQLInt),
          description:'The duration of the video(in seconds),'
        },
        released: {
          type: new GraphQLNonNull(GraphQLBoolean),
          description:'Wheather or not the video is released',
        },
      },
        resolve: (_, args) => {
          return createVideo(args);
        },
    },
  },
});
const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
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
