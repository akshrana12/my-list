const express = require('express');
const path=require('path');
const port = 8000;

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

const db=require('./config/mongoose');
const task = require('./models/taskschema');
const user= require('./models/user');

// session cookie
const session = require('express-session');
const passport = require('passport');
const passportlocal=require('./config/passport-local');
const MongoStore=require('connect-mongo');


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
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost:27017/my-list-mongodb'
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.post('/sign-in',passport.authenticate(
    'local',
    {failureRedirect:'/'}
),function(req,res){
    return res.redirect('/todolist');
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
        return res.redirect('/');
    });
});

app.get('/',function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/todolist');
    }
    return res.render('signin');
});

app.get('/todolist',passport.checkAuthentication,function(req,res){
    return res.render('to-do-list');
});

app.get('/signup',function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/todolist');
    }
    return res.render('signup');
});

app.get('/logout',function(req,res){
    req.logout();
    return res.redirect('/');
});

app.get('/getbackenddata',function(req,res){
    var sendData;
    task.find({email:req.user.email}, function(err, allData) {
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
        email: req.user.email,
        class: "unchecked"
    },function(err,newTask){
        if(err){
            console.log('Error in creating task!!!');
            return res.redirect('/todolist');
        }
        console.log("******",newTask);
        return res.redirect('back');
    });
});

app.post('/apisend',function(req,res){
    console.log(req.body.use);
    task.findOneAndDelete({'_id':req.body.use}, function(err) {
        if (err) {
            console.log(err);
        }
    });
    return;
});
app.post('/apiToggle',function(req,res){
    task.findByIdAndUpdate(req.body.id, { 'class': req.body.use },function (err, docs) {
        if (err){
            console.log(err)
        }
    });
});
app.listen(port, function(err){
    if(err)
    {
        console.log("Error in running server!!!:",err);
    }
    console.log("Server is running on port",port);
});
