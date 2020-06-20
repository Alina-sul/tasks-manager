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

const pending = () => Task.countDocuments({status: 'pending'});
const done = () => Task.countDocuments({status: 'done'});

router.get('/get-tasks', (req, res) => {
    Task.find( async (err, data) => {
        if (err) return res(console.log('Error!',err));
         res.send({
            data: data,
            pendingCount: await pending(),
            doneCount: await done()
        });
    });
});
router.post('/add-task', async function(req, res) {
     const task = new Task({
         content: req.body.content,
         tag: req.body.tag,
         status: req.body.status
     });
     await task.save((err) => {
         if (err) return res.status(500).send(err);
         return res.status(200).send(task)
     });
 });
router.post('/remove-task', async function(req, res) {
    const task = req.body;
    console.log(task);
    Task.findByIdAndRemove(task.id, (err) => {
        if(err) return res.status(500).send(err);
        const response = {
            message: "task is deleted",
            id: task.id
        };
        return res.status(200).send(response)
    })
});
router.put('/update-status', async function(req, res) {
    const task = req.body;

    console.log(task);
    Task.findByIdAndUpdate(task.id, task, (err) => {
        if(err) return res.status(500).send(err);
        const response = {
            message: "task is updated",
            status: task.status
        };
        return res.status(200).send(response)
    })
});
//
// router.get('/tasks/:id', (req, res) => {
//     console.log('res.params.id', res.params.id)
//     console.log('req', req.query)
//     Task.findOne(req.query, (err, data) => {
//         if (err) return res(console.log('Error!',err));
//         return res.send(data);
//     });
// });


app.use(router);


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
