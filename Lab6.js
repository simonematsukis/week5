
//Import packages
const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

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
const url = "mongodb://localhost:27017/";
const Developer = require('./Developers.js');
const Task = require('./Tasks.js');
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

    //mongoose connection for CRUD
    mongoose.connect('mongodb://localhost:27017/FIT2095', function (err) {
        if (err) {
            console.log('Error in Mongoose connection');
            throw err;
        }
        console.log('Successfully connected');
    

    app.get('/', function (req, res) {
        res.render('index.html');
    });

    app.get('/newtask.html', function (req, res) {
        res.render('newtask.html');  
    });

    app.get('/newdev.html', function (req, res) {
        res.render('newdev.html');  
    });

//Add new task
app.post('/addNewTask', function (req, res) {
    
    var task1 = new Task({
        _id: new mongoose.Types.ObjectId(),
        id: Math.round(Math.random()*1000),
        name: req.body.name,
        assign: req.body.assign,
        dueDate: req.body.dueDate,
        status: req.body.status,
        description: req.body.description
    });
    //Query the devolper against the ID
    Developer.findById(req.body.assign, 'name.firstName', function (err, docs) {
        console.log(docs);
    });
    task1.save(function (err) {
        if (err) throw err;
        console.log('Task successfully add to DB');
    });

    res.redirect('/listtasks.html'); 
});

//Add new dev
app.post('/addNewDev', function (req, res) {
    var dev1 = new Developer({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: req.body.firstname,
            lastName: req.body.lastname
        },
        level: req.body.level,
        address: {
            state: req.body.state,
            suburb: req.body.suburb,
            street: req.body.street,
            unit: req.body.unit
        },
    });

    dev1.save(function (err) {
        if (err) throw err;
        console.log('Dev successfully add to DB');
    });

    res.redirect('/listdevs.html'); 
});

//List all Tasks
app.get('/listtasks.html', function (req, res) {
    db.collection('tasks').find({}).toArray(function (err, data) {
        res.render('listtasks.html', { taskDb: data });
    });
});

//List all Developers
app.get('/listdevs.html', function (req, res) {
    db.collection('developers').find({}).toArray(function (err, data) {
        res.render('listdevs.html', { devDb: data });
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

    });
