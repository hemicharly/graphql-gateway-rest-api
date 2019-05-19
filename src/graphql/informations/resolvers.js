import models from './models'

const informationsResolver = {
  Query: {
    getInformations: async (parent, args, context) => {
      const result = await models.findAll()
      return result
    },
    getInformationsById: async (parent, args, context) => {
      const result = await models.findById(args.id)
      return result
    }
  }
}

export default informationsResolver
