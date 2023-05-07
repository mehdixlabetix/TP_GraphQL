import { ContextType } from '../context';

export const Subscription = {
	CvCreated: {
		subscribe: (parent: unknown, args: unknown, context: ContextType) => {
			return context.pubSub.subscribe('CvCreated');
		},
	},
	CvUpdated: {
		subscribe: (parent: unknown, args: unknown, context: ContextType) => {
			return context.pubSub.subscribe('CvUpdated');
		},
	},
	CvDeleted: {
		subscribe: (parent: unknown, args: unknown, context: ContextType) => {
			return context.pubSub.subscribe('CvDeleted');
		},
	},
};
