import { GraphQLError } from 'graphql';
import { cvs, skills } from '../db';

export const Query = {
	hello: () => 'world',
	getCvs: () => cvs,
	getCvById: (parent: unknown, args: { id: number }) => {
		const cv = cvs.find((cv) => cv.id === args.id);
		if (!cv) throw new GraphQLError(`CV with id ${args.id} not found`);
		return cv;
	},
	getSkills: () => skills,
};
