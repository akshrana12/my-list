const mongoose = require('mongoose');

// connect to data base
mongoose.connect('mongodb://localhost:27017/my-list-mongodb');

// db for accessing the data base
const db= mongoose.connection;

// error
db.on('error', console.error.bind(console,'error connecting to db'));

// up and runnig print the msg
db.once('open',function(){
    console.log('Successfully Connected to the database.')
})