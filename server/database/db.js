const mongoose = require("mongoose");

const dotenv = require("dotenv")
dotenv.config()

const USERNAME = process.env.DB_USERNAME
const PASSWORD = process.env.DB_PASSWORD

const connection = () => {
    mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@mern-todo.ibvqquf.mongodb.net/todoapp`, {}).then(() => {
        console.log("connection successfull with mongo")
    }).catch((err) => {
        console.log(err, "...connection failed with mongo")
    })

}
module.exports = connection;