// const mongoose = require('mongoose');
// const mongoDB = 'mongodb://0.0.0.0/my_database';
//
// mongoose.connect(mongoDB, { useNewUrlParser: true });
// const db = mongoose.connection;
// const Schema = mongoose.Schema;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('connected', console.error.bind(console, 'MongoDB connected:'));
// db.on('open', console.error.bind(console, 'MongoDB open:'));
//
//
// const TaskSchema = new Schema({
//     date: {
//         type: Date,
//         default: Date.now()
//     },
//     content: {
//         type: String,
//         maxlength: 100
//     },
//     status: {
//         type: String,
//         enum: ['done', 'pending']
//     },
//     tag: String
// });
//
// const Tasks = mongoose.model('Tasks', TaskSchema );
//
// const test = {
//     test: 'hi'
// };
//
//
// Tasks.create({
//     content: 'yuri',
//     status: 'pending',
//     tag: 'krup'
// }).then((e) => console.log(e));
//
//
