const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const DB_URI = 'mongodb+srv://issue-tracker:issue-tracker@issue-tracker-75nez.mongodb.net/test?retryWrites=true&w=majority';

//Connecting to our mongodb database
mongoose.connect(DB_URI)
    .catch(err => console.log(err))
    .then(() => {
        console.log("Connected to DB")
    })
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))