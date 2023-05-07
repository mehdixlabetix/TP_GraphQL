import { GraphQLError } from 'graphql';
import { ContextType } from '../context';
import { cvs, skills as skillz, users } from '../db';
import { CV } from '../interfaces';

export const Mutation = {
	createCV: (
		_parent: unknown,
		{ input }: { input: CV },
		{ pubSub }: ContextType,
	) => {
		const { name, age, job, skills: skillIds, userId } = input;
		const id = cvs.length + 1;

		// verify skillIds and userId are valid
		console.log(skillIds);
		const skillsExist = skillIds.every((skillId: number) =>
			skillz.some((skill) => skill.id === skillId),
		);
		if (!skillsExist) {
			throw new GraphQLError(`One or more skill IDs do not exist.`);
		}

		const userExists = users.some((user) => user.id === userId);
		if (!userExists) {
			throw new GraphQLError(`User with ID ${userId} does not exist.`);
		}

		const skills = skillz
			.filter((skill) => skillIds.includes(skill.id))
			.map((s) => s.id);

		const user = users.find((user) => user.id === userId);
		if (!user) {
			throw new GraphQLError(`User with ID ${userId} not found.`);
		}

		const newCV: CV = {
			id,
			name,
			age,
			job,
			skills,
			userId: user.id,
		};
		cvs.push(newCV);

		pubSub.publish('CvCreated', { CvCreated: newCV });

		return newCV;
	},
	updateCV: (
		_parent: never,
		{ input }: { input: CV },
		{ pubSub }: ContextType,
	) => {
		const { id, name, age, job, skills: skillIds, userId } = input;

		const cvIndex = cvs.findIndex((cv) => cv.id === id);
		if (cvIndex === -1) {
			throw new Error(`CV with ID ${id} not found.`);
		}

		// verify skillIds and userId are valid
		const skillsExist = skillIds.every((skillId: number) =>
			skillz.some((skill) => skill.id === skillId),
		);

		if (!skillsExist) {
			throw new GraphQLError(`One or more skill IDs do not exist.`);
		}
		const userExists = users.some((user) => user.id === userId);
		if (!userExists) {
			throw new GraphQLError(`User with ID ${userId} does not exist.`);
		}

		const skills = skillz.filter((skill) => skillIds.includes(skill.id));
		const user = users.find((user) => user.id === userId);
		if (!user) {
			throw new GraphQLError(`User with ID ${userId} not found.`);
		}

		const updatedCV = {
			...cvs[cvIndex],
			name: name ?? cvs[cvIndex].name,
			age: age ?? cvs[cvIndex].age,
			job: job ?? cvs[cvIndex].job,
			skills: skills.map((s) => s.id),
			user: user.id,
		};
		cvs[cvIndex] = updatedCV;

		pubSub.publish('CvUpdated', { CvUpdated: updatedCV });

		return updatedCV;
	},
	deleteCV: (
		_parent: never,
		{ id }: { id: number },
		{ pubSub }: ContextType,
	) => {
		const index = cvs.findIndex((cv) => cv.id === id);
		if (index === -1) {
			throw new GraphQLError(`CV with ID ${id} not found`);
		}

		const deletedCV = cvs.splice(index, 1)[0];
		const userIndex = users.findIndex((user) => user.id === deletedCV.userId);
		if (userIndex !== -1) {
			users[userIndex].cvs = users[userIndex].cvs.filter(
				(cvId) => cvId.id !== id,
			);
		}

		pubSub.publish('CvDeleted', { count: 1 });

		return { count: 1 };
	},
};
