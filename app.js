const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const app = express()
const PORT = 3000


app.get('/', (req,res) => {
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
})

app.listen(PORT,() => {
    console.log(`server is listening on port https://localhost:${PORT}`)
})