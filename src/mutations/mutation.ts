import { GraphQLError } from "graphql";
import { context } from "../context/context";
import { db } from "../db/db";
export const Mutation = {
  createCV: (_parent: never, { input }: any, { pubSub }: typeof context) => {
    const { name, age, job, skillIds, userId } = input;
    const id = db.cvs.length + 1;
    //verify skillIds and userId are valid
    const skillsExist = skillIds.every((skillId: number) =>
      db.skills.some((skill) => skill.id === skillId)
    );

    if (!skillsExist) {
      throw new GraphQLError(`One or more skill IDs do not exist.`);
    }
    const userExists = db.users.some((user) => user.id === userId);
    if (!userExists) {
      throw new GraphQLError(`User with ID ${userId} does not exist.`);
    }
    const skills = db.skills
      .filter((skill) => skillIds.includes(skill.id))
      .map((s) => s.id);
    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      throw new GraphQLError(`User with ID ${userId} not found.`);
    }

    const newCV = {
      id,
      name,
      age,
      job,
      skills,
      userID: user.id,
    };
    db.cvs.push(newCV);

     //pubSub.publish('CVUpdates',newCV);

    return newCV;
  },

  updateCV: (_parent: never, { input }: any, { pubSub }: typeof context) => {
    const { id, name, age, job, skillIds, userId } = input;
    const cvIndex = db.cvs.findIndex((cv) => cv.id === id);
    if (cvIndex === -1) {
      throw new Error(`CV with ID ${id} not found.`);
    }
    //verify skillIds and userId are valid
    const skillsExist = skillIds.every((skillId: number) =>
      db.skills.some((skill) => skill.id === skillId)
    );

    if (!skillsExist) {
      throw new GraphQLError(`One or more skill IDs do not exist.`);
    }
    const userExists = db.users.some((user) => user.id === userId);
    if (!userExists) {
      throw new GraphQLError(`User with ID ${userId} does not exist.`);
    }

    const skills = db.skills.filter((skill) => skillIds.includes(skill.id));
    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      throw new GraphQLError(`User with ID ${userId} not found.`);
    }

    const updatedCV = {
      ...db.cvs[cvIndex],
      name: name ?? db.cvs[cvIndex].name,
      age: age ?? db.cvs[cvIndex].age,
      job: job ?? db.cvs[cvIndex].job,
      skills: skills.map((s) => s.id),
      user: user.id,
    };
    db.cvs[cvIndex] = updatedCV;
    // pubSub.publish('CVUpdates',updatedCV);
    return updatedCV;
  },

  deleteCV: (
    _parent: never,
    { id }: { id: number },
    { pubSub }: typeof context
  ) => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      throw new GraphQLError(`CV with ID ${id} not found`);
    }
    const deletedCV = db.cvs.splice(index, 1)[0];
    const userIndex = db.users.findIndex(
      (user) => user.id === deletedCV.userID
    );
    if (userIndex !== -1) {
      db.users[userIndex].cvs = db.users[userIndex].cvs.filter(
        (cvId) => cvId.id !== id
      );
    }

    //   pubSub.publish('CVUpdates',deletedCV);
    return true;
  },
};
