import { GraphQLError } from 'graphql';
import { skills as skillz, users } from '../db';
import { CV } from '../interfaces';

export const Cv = {
	user: (parent: CV) => {
		const user = users.find((user: any) => user.id === parent.userId);
		if (!user)
			throw new GraphQLError(`User with id ${parent.userId} not found`);
		return user;
	},
	skills: (parent: CV) => {
		return skillz.filter((skill) => {
			return parent.skills.includes(skill.id);
		});
	},
};
