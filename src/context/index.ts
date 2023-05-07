import * as index from '../db';
import { createPubSub } from '@graphql-yoga/subscription';
import { YogaInitialContext } from 'graphql-yoga';
import { CV } from '../interfaces';

export type PubSubChannels = {
	CvCreated: [{ CvCreated: CV }];
	CvUpdated: [{ CvUpdated: CV }];
	CvDeleted: [{ count: number }];
};

export const pubSub = createPubSub<PubSubChannels>();

export type ContextType = {
	db: typeof index;
	pubSub: typeof pubSub;
};

export async function createContext(
	initialContext: YogaInitialContext,
): Promise<ContextType> {
	return {
		db: index,
		pubSub,
	};
}
