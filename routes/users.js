const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const app = express()
const router = express.Router()

const users = require('../data/users')
const {generateToken,verifyToken} = require('../middlewares/authMiddleware')

router.post('/login', (req,res) => {
    //console.log(req.body); 
    //console.log(users)
    const {username,password} = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if(user) {
        const token = generateToken(user);
        console.log(token)
        req.session.token = token;
        //console.log(token)
        res.redirect('/dashboard')
    } else {
        res.status(401).json({message: 'Credentials incorrect'})
    }
})

router.get('/dashboard', verifyToken, (req,res) => {
    const userId = req.user;
    const user = users.find(user => user.id === userId);
    if(user) {
        res.send(
            `
            <h1>Welcome, ${user.name}! </h1>
            <p>ID: ${user.id} </p>
            <p>User: ${user.username} </p>
            <br>
            <form action="/logout" method="post">
                <button type="submit">Log out</button>
            </form>
            <a href="/">Home</a>
            `
        );
    } else {
        res.status(401).json({message: 'User not found'})
    }
});

router.post('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/')
})

module.exports = router