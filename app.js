const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')

const {secret} = require('./crypto/config')

//const {generateToken,verifyToken} = require('./middlewares/authMiddleware')
const router = require('./routes/users')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/', router)

app.use(
    session({
        secret: secret,
        resave: false,
        saveUninitialized: true,
        cookie: {secure: true}
    })
)

app.get('/', (req,res) => {
    if (req.session.token) {
        res.send(`
            <a href="/dashboard">Dashboard</a>
            <form action="/logout" method="post">
                <button type="submit">Log out</button>
            </form>
        `);
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

app.listen(PORT,() => {
    console.log(`server is listening on port https://localhost:${PORT}`)
})