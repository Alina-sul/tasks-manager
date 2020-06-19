//import {route} from "express";

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const router = express.Router();
//const test = require('./dbFunctions.js');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://0.0.0.0/my_database';

mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
const Schema = mongoose.Schema;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', console.error.bind(console, 'MongoDB connected:'));
db.on('open', console.error.bind(console, 'MongoDB open:'));


const TaskSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['done', 'pending']
    },
    tag: String
});
const Task = mongoose.model('Task', TaskSchema );


app.use(cors());
app.use(express.json());


app.get('/get-data', (req, res) => {
    Task.find((err, data) => {
        if (err) return res(console.log('Error!',err));
        return res.send(data);
    });
});

app.post('/add-task', async function(req, res) {
    const task = new Task({
        content: req.body.content,
        tag: req.body.tag,
        status: req.body.status
    });
    await task.save();
    await res.send(task);
});


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
