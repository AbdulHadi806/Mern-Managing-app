const express = require("express");
const app = express();
const PORT = 8000;
const connection = require("./database/db")
const cors = require("cors");
const Routes = require("./routes/route");

connection()
app.use(cors())
app.use(express.json())
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))
app.use('/', Routes)

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`)
})