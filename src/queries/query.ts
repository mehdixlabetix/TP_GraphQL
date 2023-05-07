import { GraphQLError } from "graphql"
import { db } from "../db/db"

export const Query={
    hello: () => 'world',
    getCvs: () => {
        return db.cvs},
    getCvById: (parent: any, args: { id: number }) => {
        const cv=db.cvs.find(cv => cv.id === args.id)
        if (!cv) throw new GraphQLError(`CV with id ${args.id} not found`)
        return cv
    },getSkills: () => {
        return db.skills},
    
}
