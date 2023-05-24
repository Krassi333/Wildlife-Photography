const { Schema, model, Types } = require('mongoose');
const Post = require('./Post');

const namePattern = /^[a-z]+$/igm;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long!'],
        validate: {
            validator: (v) => { return namePattern.test(v); },
            message: 'First name must contain onlu=y letters'
        }

    },
    lastName: { type: String, required: true, minlength: [5, 'Last name must be at least 5 characters long!'] },
    email: { type: String, required: true },
    password: { type: String, required: true },
   myPosts: { type: [Types.Object], ref: 'Post', default: [] }
});

const User = model('User', userSchema);

module.exports = User;
