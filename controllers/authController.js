const express = require('express');
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// LOGIN
router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.get('/profile', async (req, res) => {
    const user = await User.findOne({ userId: req.params.userId});
    res.render('auth/profile', {
        user
    })
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    
    let userToLogin = await User.findOne({ username: req.body.username})

    if (userToLogin) {
        bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
            if(result){
                req.session.userId = userToLogin._id
                req.session.name = userToLogin.name;
                res.redirect('/events/userEvents')
            } else {
                res.send('no can do ')
            }
        });
    }
});




// SIGN UP
router.get('/signup', (req, res) => {
    res.render('auth/signup')
})

router.post('/signup', async (req, res) => {
    if (req.body.username && req.body.password) {
        let plainTextPass = req.body.password
        
        return bcrypt.hash(plainTextPass, 10, async (err, hashedPass) => {
            req.body.password = hashedPass
            let newUser = await User.create(req.body)
            res.send(newUser)
        
        });
    }
    res.json({msg: "pls enter username"})
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

const requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};


module.exports = router