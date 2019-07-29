const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const morgan = require('morgan')

const DB_URI = 'mongodb+srv://issue-tracker:issue-tracker@issue-tracker-75nez.mongodb.net/test?retryWrites=true&w=majority';

//Connecting to our mongodb database
mongoose.connect(DB_URI)
    .catch(err => console.log(err))
    .then(() => {
        console.log("Connected to DB")
    })


app.use(morgan(''))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const UserModel = require('./models/user.model');
//Create user
app.post('/user', (req, res, next) => {
    let user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
    console.log(req.body);
    UserModel.create(user, (err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    })
})

app.get('/user', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

app.get('/userById/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

//Delete  user
app.delete('/user/:id', (req, res, next) => {
    const id = req.params.id;
    UserModel.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))