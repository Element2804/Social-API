const { Schema, model, Types } = require('mongoose');
// import moment module to format the timestamp 
const moment = require('moment');

// schema for reactions
const reactionSchema = new Schema (
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
)

// schema for thoughts
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200
        },
        createdAt: {

        },
        username: {
            type: String,
            required: true
        },
        //reaction subdocument schema
        reactions: [reactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false
    }
)

thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
})

// creates model named "thought" with the thoughtSchema parameters
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

