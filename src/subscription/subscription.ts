function newCVSubscribe(parent, args, context, info) {
    return context.pubsub.asyncIterator("CVUpdate")
}

const CVUpdate = {
    subscribe: newCVSubscribe,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    CVUpdate,
}