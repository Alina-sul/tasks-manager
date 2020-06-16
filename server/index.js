const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const router = express.Router();

const mongoose = require('mongoose');
const mongoDB = 'mongodb://0.0.0.0/my_database';

mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
const Schema = mongoose.Schema;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', console.error.bind(console, 'MongoDB connected:'));
db.on('open', console.error.bind(console, 'MongoDB open:'));

const TaskSchema = new Schema({
    id: Number,
    date: Date,
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

const Tasks = mongoose.model('Tasks', TaskSchema );





app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
