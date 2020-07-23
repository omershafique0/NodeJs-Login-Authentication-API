const JOI = require('@hapi/joi');

const SignUpSchema = JOI.object().keys({
    firstName: JOI.string().min(3).max(30).required(),
    lastName: JOI.string().min(3).max(30).required(),
    email: JOI.string().min(15).max(40).required().email(),
    password: JOI.string().min(8).max(30).required(),
})

const SignInSchema = JOI.object().keys({
    email: JOI.string().min(15).max(40).required().email(),
    password: JOI.string().min(8).max(30).required(),
})

module.exports = {
    SignUpSchema,
    SignInSchema
}