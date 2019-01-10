//importing modules

var express = require('express');
var mongoose =require('mongoose');
var cors = require('cors');
var bodyparser =require('body-parser');
var path = require('path');

var app = express();
const route = require('./routes/route');
//port no 
   
const port = 3000;

//mongodb connenction

mongoose.connect('mongodb://localhost:27017/contactlist');

mongoose.connection.on('connected',()=>{
    console.log("connected to database at port 27017");
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in connection to database'+err);
    }
});


//cors-adding middleware to support port 3000 and 4200 interaction
app.use(cors());

//bodyparser
app.use(bodyparser.json());

//static
app.use(express.static(path.join(__dirname,'public')));

//route
app.use('/api',route);

app.get('/',(req,res) => res.send('hello new world!'));

//testing server
 app.listen(port, () =>
     console.log('server started at '+port));
