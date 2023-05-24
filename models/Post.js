const { Schema, model, Types } = require('mongoose');
const User = require('./User');

const urlPattern = /https?:\/\/./i;


const postSchema = new Schema({
    title: { type: String, required: true, minlength: [6, 'Title must be at least 6 characters long!'] },
    keyword: { type: String, required: true, minlength: [6, 'Keyword must be at least 6 characters long!'] },
    location: { type: String, required: true, maxlength: [15, 'Location must be at most 15 characters long!'] },
    createdAt: { type: String, required: true, length: [10, 'Date must be at format 01.01.2000 !'] },
    image: {
        type: String,
        required: true,
        validation: {
            validate: (v) => urlPattern.test(v),
            message: 'Invalid URL!'
        }
    },
    description: { type: String, required: true, minlength: [8, 'Description must be at least 8 characters long!'] },
    author: { type: [Types.ObjectId], ref: 'User' },
    votes: { type: [Types.ObjectId], ref: 'User', default: [] },
    rating: { type: Number, default: 0 }
});

postSchema.index({ author: 1 }, {
    locale: 'en',
    strength: 2
})

const Post = model('Post', postSchema);

module.exports = Post;


