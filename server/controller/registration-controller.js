const User = require("../model/resgistration");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/error");
const postUser = async (req, res, next) => {
    if(!req.body.data.userName || !req.body.data.password) {
        return next(errorHandler({status: 400, message: "Need both userName and Password in signUp"}))
    }
    try {
        const userExists = await User.findOne({ user: req.body.data.userName });
        console.log(userExists)
        if(userExists !== null) {
            return res.status(500).json({message: "User Already Exists", status: false})
        }
        const salt = await bcrypt.genSalt(10);
        const password = req.body.data.password
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await new User({
            user: req.body.data.userName,
            password: hashedPassword,
        });
        await newUser.save()
         res.status(200).json({message: "Successfully Signed In", status: true});
    } catch (err) {
        return res.status(500).json({err, message: "Unsuccessfull in creating a user", status: false})
    }
};


const loginUser = async (req, res) => {
    // if(!req.body.data.userName || !req.body.data.password){
    //     return next(errorHandler({status: 400, message: "Need both userName and Password in Login"}))
    // }
    try {
        const user = await User.findOne({
            user: req.body.data.userName,
        })
        const passwordChecker = await bcrypt.compare(req.body.data.password, user.password)
        if(user && passwordChecker) {
            const token =  jwt.sign({
                user: user.user,
                password: user.password,
                _id: user._id
            }, 'secret_is_a_secret', {
                expiresIn: '1d'
            })
            res.set('Authorization', `Bearer ${token}`).status(200).json({user,token})
        }
        else {
            res.status(300).json({status: "Password or user not correct or found"})
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
}




const logOutUser = (req, res) => {
    return res.status(200).json({status: "Logged Out"})
}

const isLoginIn = (req, res) => {
    const token = req.cookies.access_token
    if(!token) {
        return res.json(false)
    }
    
    return jwt.verify(token, 'secret_is_a_secret', (err) => {
        if(err) {
            return res.json(false)
        } else {
            res.json(true)
        }
    })
}

exports.isLoginIn = isLoginIn
exports.postUser = postUser;
exports.loginUser = loginUser;
exports.logOutUser = logOutUser

