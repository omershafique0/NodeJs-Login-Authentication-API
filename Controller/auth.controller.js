    const MongoService = require('../Services/auth.services');
    const bcrypt = require("bcryptjs");
    const { checkUser } = require('../Services/auth.services');
    const userSchema = require('../Schema/auth.schema');

    module.exports.createUser = async (req, res) => {
        console.log("My data is ", req.body)

        const validation = userSchema.SignUpSchema.validate(req.body);
        if (validation.error){
            console.log(validation.error);
            return res.status(400).json({
                message: validation.error.details[0].message,
            });
        }

        try {
            const email = req.body.email
            console.log("email", email)

            const user = await MongoService.checkUser(email)
            if (user) {
                res.status(401).json({
                    message: "User has been already registered"
                })
                return;
            }
            const newUser = new User(req.body);
            const data = await MongoService.createUser(newUser)
            res.status(201).json({
                message: "Account is sucessfully created and email has been sent."
            })
            console.log("my data ", data)

        }
        catch (error) {
            res.json(error)

        }
    }

    module.exports.login = async (req, res) => {
        console.log("Login Details ", req.body)

        const validation = userSchema.SignInSchema.validate(req.body);
        if (validation.error){
            console.log(validation.error);
            return res.status(400).json({
                message: validation.error.details[0].message,
            });
        }
    
        try {
            const { email, password } = req.body
            const user = await MongoService.checkUser(email)
            console.log("user is ", user)
            if (user) {
                //is compare password
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        console.log("match is done")
                        res.status(201)
                        .json({
                            message: "user is successfully Login"
                        })
                    }
                    else {
                        return res.status(401)
                        .json({
                            message: "password is incorrect"
                        })
                    }
                })
            }
            else {
                res.status(400)
                    .json({
                        message: "User is not Register"
                    })
            }

        }
        catch (error) {

        }
    }  