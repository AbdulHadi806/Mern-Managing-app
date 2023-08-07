const express = require("express");
const app = express();
const PORT = 8000;
const connection = require("./database/db");
const cors = require("cors");
const Routes = require("./routes/route");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

connection();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/', Routes);
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(status).json({ message, stack: err.stack + " message from indexJS file" });
});

app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
