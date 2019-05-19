/**
 * Resolvers file
*/

const userResolver = {
  Query: {
    getUsers: (parent, args, context) => {
      return context.db
    },
    getUserByEmail: (parent, args, context) => {
      return context.db.filter(user => user.email === args.email)[0]
    },
    getUserByUsername: (parent, args, context) => {
      return context.db.filter(user => user.username === args.username)[0]
    }
  }
}

export default userResolver
