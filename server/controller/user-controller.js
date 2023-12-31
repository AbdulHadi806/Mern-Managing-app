const User = require("../model/resgistration");


const getUserInfo = async(req, res, next) => {
    try {
        const data = await User.findById(req.user._id).select('user password')
        return res.status(200).json(data)
    } catch(err){
        return next(err)
    }
}

const updateUser = async(req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.user._id, {
            user: req.body.userName,
        }, {new: true}).select('user')
       return res.status(200).json(updateUser)
    } catch (err) {
        console.log(err)
    }
}

exports.updateUser = updateUser
exports.getUserInfo = getUserInfo

