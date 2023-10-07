require("dotenv").config();
const express = require('express')
const morgan = require("morgan");
const cors = require("cors")
const session = require('express-session')
const app = express()
const PORT = 3040;

const authController = require('./controllers/authController');
const playlistController = require('./controllers/playlistController')
const songController = require('./controllers/songController');


app.use(morgan("tiny"));
app.use(cors({credentials: true, origin: 'http://localhost:3000', methods:'GET,HEAD,PUT,POST,DELETE'}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

app.use(session({ secret: 'coachmike', cookie: {maxAge: 3600000}}))

app.use('/', authController)
app.use('/', playlistController)

app.get("/", (req,res) => {
    res.send("Hello")
})

// own middleware for checking logged in
app.use((req, res, next) => {
    console.log(req.session, '====')
    if (!req.session.userId){
        res.redirect('/login')
        return
    }
    next();
});

app.use('/api/songs', songController)


app.listen(PORT, () => console.log(PORT, "is coming"))