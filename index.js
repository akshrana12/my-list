const express = require('express');
const path=require('path');
const port = 8000;

const app = express();
const db=require('./config/mongoose');
const task = require('./models/taskschema');

app.use(express.static(path.join(__dirname,'views')));
app.use(express.static(path.join(__dirname,'CSS')));
app.use(express.static(path.join(__dirname,'script')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors=require('cors')
app.use(cors())


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
