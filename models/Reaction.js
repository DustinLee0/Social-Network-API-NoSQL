const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        required: true,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (presentDate) => moment(presentDate).format('MMM DD, YYYY hh:mm a')
    },
}, 
{
    toJSON: {
        virtuals: true
    },
    id: false
});

module.exports = reactionSchema;