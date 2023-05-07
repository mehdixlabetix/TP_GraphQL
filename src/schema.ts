import { createSchema } from 'graphql-yoga';
import * as fs from 'fs';
import * as path from 'path';
import { Query } from './queries';
import { Cv } from './queries/cv';
import { Mutation } from './mutations';
import { Subscription } from './subscription';

export const schema = createSchema({
	typeDefs: fs.readFileSync(
		path.join(__dirname, 'schemas/schema.graphql'),
		'utf8',
	),
	resolvers: {
		Query,
		CV: Cv,
		Mutation,
		Subscription,
	},
});
