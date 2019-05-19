import '@babel/polyfill'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rfs from 'rotating-file-stream'

import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import { ApolloServer } from 'apollo-server-express'

// Load env variables
dotenv.config({
  path: path.join(__dirname, '.env')
})

// Load GraphQL files
const graphqlFolder = path.join(__dirname, 'src', 'graphql')
const typeDefsFolder = path.join(graphqlFolder, '**/schema.js')
const resolversFolder = path.join(graphqlFolder, '**/resolvers.js')

const typeDefs = mergeTypes(fileLoader(typeDefsFolder))
const resolvers = mergeResolvers(fileLoader(resolversFolder))

// Middleware function
const context = ({ req, res }) => ({
  token: req.headers.authorization
})

// Create Apollo Server
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

const server = {
  app: express(),
  path: '/graphql'
}

// Morgan settings
// Only works in production mode with PM2 cluster mode
if (process.env.NODE_ENV === 'production') {
  if (typeof process.env.pm_id === 'undefined') {
    throw new Error('The application must be run through PM2 at the production stage.')
  }

  const cluster = parseInt(process.env.pm_id)
  // First cluster for single core machines
  if (cluster === 0) {
    const accessLogStream = rfs('access.log', {
      interval: '1d',
      compress: 'gzip',
      maxFiles: 7,
      path: path.join(__dirname, 'logs')
    })

    const logger = morgan('combined', {
      stream: accessLogStream
    })

    server.app.use(logger)
  }
}

// Express middlewares
server.app.use(cors())
server.app.use(helmet())
apollo.applyMiddleware(server)

// Listening
const port = process.env.PORT || 3002
server.app.listen({ port }, () => {
  const url = `http://localhost:${port}${server.path}`
  console.log(`\n  Server listening on: ${url}`)
})
