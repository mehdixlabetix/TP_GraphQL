import { createSchema } from 'graphql-yoga'
import fs from "fs"
import path from "path"
import { Query } from './queries/query'
import { CV } from './queries/cv'
import { Mutation } from './mutations/mutation'

export const schema = createSchema({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schemas/schema.graphql'),
    'utf8'
  ),
  resolvers: {
    Query,
    CV,
    Mutation,



  },

})