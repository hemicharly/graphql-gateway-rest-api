/**
 * Schema file
*/

import { gql } from 'apollo-server-express'
import types from './types'
import queries from './queries'
import mutations from './mutations'

const schema = gql`
  ${types}
  ${queries}
  ${mutations}
`

export default schema
