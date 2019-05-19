/**
 * Types file
*/

import { gql } from 'apollo-server-express'

const userType = gql`
  type User {
    name: String!
    email: ID!
    username: ID!
    password: String!
  }
`

export default userType
