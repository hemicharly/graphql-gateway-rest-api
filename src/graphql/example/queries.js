/**
 * Queries file
*/

import { gql } from 'apollo-server-express'

const userQuery = gql`
  type Query {
    getUsers: [User!]!
    getUserByEmail(email: ID): User!
    getUserByUsername(username: ID): User!
  }
`

export default userQuery
