const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        user: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
}, {timestamps: true});

const user =  new mongoose.model("User", userSchema)
module.exports = user