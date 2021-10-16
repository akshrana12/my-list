const express = require('express');
const path=require('path');
const port = 8000;

const app = express();
const db=require('./config/mongoose');
const task = require('./models/taskschema');
const user= require('./models/user');

// session cookie
const session = require('express-session');
const passport = require('passport');
const passportlocal=require('./config/passport-local');

app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'CSS')));
app.use(express.static(path.join(__dirname,'script')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors=require('cors')
app.use(cors())

app.use(session({
    name: 'to-do',
    secret:'secret hai',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


app.post('/sign-in',passport.authenticate(
    'local',
    {failureRedirect:__dirname+'\\views\\to-do-list.html'}
),function(req,res){
    console.log('hello\n');
    str=__dirname+'\\views\\to-do-list.html';
    return res.redirect(str);
});

app.post('/sign-up-db',function(req,res){
    user.create({
        email:req.body.email,
        password:req.body.password,
        name:req.body.name
    },function(err,User){
        if(err){
            console.log('Error in creating user!!!');
            return;
        }
        console.log("******",User);
        return res.redirect('back');
    });
});

app.get('/',function(req,res){
    str=__dirname+'\\views\\signin.html';
    return res.sendFile(str);
});

app.get('/todolist',function(req,res){
    str=__dirname+'\\views\\to-do-list.html';
    return res.sendFile(str);
});

app.get('/signup',function(req,res){
    str=__dirname+'\\views\\signup.html';
    return res.sendFile(str);
});

app.get('/getbackenddata',function(req,res){
    var sendData;
    task.find({}, function(err, allData) {
        if (err) {
            console.log(err);
        } else {
           sendData=allData;
        }
        res.send(sendData);
    });
});

app.post('/add-task',function(req,res){
    task.create({
        mytask : req.body.inpitem,
    },function(err,newTask){
        if(err){
            console.log('Error in creating task!!!');
            return;
        }
        console.log("******",newTask);
        return res.redirect('back');
    });
});

app.post('/apisend',function(req,res){
    console.log(req.body.use);
    task.findOneAndDelete({'mytask':req.body.use}, function(err) {
        if (err) {
            console.log(err);
        }
    });
    return;
});

app.listen(port, function(err){
    if(err)
    {
        console.log("Error in running server!!!:",err);
    }
    console.log("Server is running on port",port);
});
