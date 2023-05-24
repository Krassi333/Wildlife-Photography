const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');

const secret = 'rtyuiokjh456vbnk646513@#6545';

async function register(data) {
    const existingEmail = await User.findOne({ email: data.email }).collation({ locale: 'en', strength: 2 });


    if (existingEmail) {
        throw new Error('Email is already registered!');
    }
    //console.log(data);
    const hashedPass = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPass
    });

    const token = createToken(user);

    return token;

};

module.exports = {
    register,
    login,
    verifyToken,
    getUserEmail,
    getAllMyPosts,
    getUserName
}