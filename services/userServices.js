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

async function login(email, password, req) {
    if (email == '' || password == '') {
        throw new Error('All fields are required!');
    }

    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Invalid email or password!');
    }

    const passCheck = await bcrypt.compare(password, user.password);

    if (!passCheck) {
        throw new Error('Invalid email or password!');
    }

    const token = createToken(user);
    return token;
}

module.exports = {
    register,
    login,
    verifyToken,
    getUserEmail,
    getAllMyPosts,
    getUserName
}