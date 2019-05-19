import { gql } from 'apollo-server-express'

const informationMutation = gql`
  type Mutation {
    deleteInformation(id: ID!): Informations
  }
`

export default informationMutation
