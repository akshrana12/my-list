const express = require('express');
const path=require('path');
const port = 8000;


const app = express();
const db=require('./config/mongoose');
const task = require('./models/taskschema');


app.use(express.static(path.join(__dirname,'views')));
app.use(expre ss.static(path.join(__dirname,'CSS')));
app.use(express.static(path.join(__dirname,'script')));

app.get('/',function(req,res){
     str=__dirname+'\\views\\to-do-list.html';
     return res.sendFile(str);
});

app.get('/signin',function(req,res){
    str=__dirname+'\\views\\signin.html';
    return res.sendFile(str);
});

app.get('/signup',function(req,res){
    str=__dirname+'\\views\\signup.html';
    return res.sendFile(str);
});


app.listen(port, function(err){
    if(err)
    {
        console.log("Error in running server!!!:",err);
    }
    console.log("Server is running on port",port);
});
