const User = require('../models/auth.models');

const checkUser = (email) => {
    return User.findOne({ email })
}

const createUser = (newUser) => {
    return newUser.save()
}

const UserServices = {
    createUser,
    checkUser
}

module.exports = UserServices;