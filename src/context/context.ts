import { db } from '../db/db'
import { PubSub } from 'graphql-subscriptions';
 
// 1
type PubSubChannels = {
    CVUpdates: any
}
 
// 2
const pubSub = new PubSub()

export const context = {
    db,
    pubSub
}