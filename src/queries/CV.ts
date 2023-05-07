import { GraphQLError } from "graphql"
import { db } from "../db/db"

export const CV={
    user :  (parent: any, args: any, context: any, info: any) => {
        const user=db.users.find((user: any) => user.id === parent.userID)
        if (!user) throw new GraphQLError(`User with id ${parent.userID} not found`)
        return user
    },
    skills: (parent: any, args: any, context: any, info: any) => {
        const skills = db.skills.filter((skill) => {
            return parent.skills.includes(skill.id);
        });
        return skills;
    },
}