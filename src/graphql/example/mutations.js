/**
 * Mutations file
*/

import { gql } from 'apollo-server-express'

const userMutation = gql`
  type Mutation {
    deleteUser(id: ID!): User
  }
`

export default userMutation
