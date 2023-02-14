const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (presentDate) => moment(presentDate).format('MMM DD, YYYY hh:mm a')
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ],
}, 
{
    toJSON: {
        virtuals: true
    },
    id: false
});

thoughtSchema.virtual('reactionCount').get( () => this.reactions.length );

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;