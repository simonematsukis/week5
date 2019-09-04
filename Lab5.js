
//Import packages
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const morgan = require('morgan');
//Configure Express
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('images'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('common'));
app.listen(8080);
//Configure MongoDB
const MongoClient = mongodb.MongoClient;
// Connection URL
const url = "mongodb://" + process.argv[2]+":27017/";
//reference to the database
let db;
//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("FIT2095");
        }
    });


    app.get('/', function (req, res) {
        res.render('index.html');
    });

    app.get('/newtask.html', function (req, res) {
        res.render('newtask.html');  
    });

//Add new task
app.post('/addNewTask', function (req, res) {
    let taskDetails = req.body;
    let newID= Math.round(Math.random()*1000);
    db.collection('tasks').insertOne({ 
        id: newID,
        name: taskDetails.name, 
        assign: taskDetails.assign, 
        dueDate: taskDetails.dueDate,
        status: taskDetails.status,
        description: taskDetails.description
    });
    res.redirect('/listtasks.html'); 
});

//List all Tasks
app.get('/listtasks.html', function (req, res) {
    db.collection('tasks').find({}).toArray(function (err, data) {
        res.render('listtasks.html', { taskDb: data });
    });
});


//Update Task Status
app.get('/updateStatus.html', function (req, res) {
    res.render('updateStatus.html');
});


app.post('/updateTaskStatus', function (req, res) {
    let updateInt = parseInt(req.body.del);
    let updateStat = req.body.status;
    console.log(updateInt);
    console.log(updateStat);
    db.collection('tasks').updateOne({ id: updateInt }, { $set: {status: updateStat } }, 
        { upsert: false }, function (err, result) {
    });
    res.redirect('/listtasks.html');
})


//Delete All 'Completed' Tasks
app.get('/deleteAll', function (req, res) {
    db.collection("tasks").deleteMany({status: 'Complete'}, function (err, obj) {
        console.log(obj.result);
      });
    res.redirect('listtasks.html');
    
});


//Delete Tasks By ID 
app.get('/deleteByID.html', function (req, res) {
    res.render('deleteByID.html')
    
});


app.post('/deleteTask', function (req, res) {
    let delInt = req.body.del;
    console.log(delInt);
    db.collection("tasks").deleteOne({ id: parseInt(delInt) }, function (err, obj) {
        console.log(obj.result);
      });
      res.redirect('listtasks.html');
});
