import { gql } from 'apollo-server-express'

const informationsQuery = gql`
  type Query {
    getInformations: [Informations]
    getInformationsById(id: ID!): Informations
  }
`

export default informationsQuery
