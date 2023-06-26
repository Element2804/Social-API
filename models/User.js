const { Schema, model, Types } = require('mongoose');
// defines schema parameters for the user
const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // email validation using a regular expression
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill in a valid email address"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            },
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: "User"
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);
// custom virtual returning the amount of friends a user has
userSchema.virtual("friendCount").get(function(){
    return this.friends.length;
});
//creates user model with the userSchema parameters
const User = model('User', userSchema);

module.exports = User;