import { gql } from 'apollo-server-express'

const informationsType = gql`
  type Informations {
    id: ID!
    description: String!
    author: String!
  }
`

export default informationsType
