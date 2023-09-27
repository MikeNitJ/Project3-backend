require("dotenv").config();
const express = require('express')
const app = express()
const PORT = 4000


const morgan = require("morgan");
const cors = require("cors")


app.use(morgan("tiny"));
app.use(cors())
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello")
})

app.listen(PORT, () => console.log(PORT, "is coming"))