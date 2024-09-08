const express = require('express')
const router = express.Router()

const users = require('../data/users')
const {generateToken,verifyToken} = require('../middlewares/authMiddleware')

router.get('/', (req,res) => {
    if (req.session.token) {
        res.redirect("/dashboard");
    } else {
    const loginForm = `
    <form action ="/login" method="post">
        <label for="username">User: </label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password: </label>
        <input type="password" id="password" name="password" required>
        <br>
        <button type="submit">Log in</button>
    </form>
    <a href="/dashboard">Dashboard</a>
    `
    res.send(loginForm);
    }
})

router.post('/login', (req,res) => {
    //console.log(req.body); 
    //console.log(users)
    const {username,password} = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if(user) {
        const token = generateToken(user);
        
        req.session.token = token;
        
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