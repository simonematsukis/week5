let express = require('express');
let app = express();
//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
let bodyParser = require('body-parser');


//Use body parser for user input
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

//Call Form
app.post('/data', function (req, res) {
    console.log(req.body.name);
    console.log(req.body.dueDate);
    console.log(req.body.description);
    
    //Store values from input into variables
    let nameInput = req.body.name;
    let dateInput = req.body.dueDate;
    let descInput = req.body.description;

    //Push those values into your array to be displayed
    db.push({
        name: nameInput,
        dueDate: dateInput,
        description: descInput
    });

})

let db = [];

//Initial Value
db.push({
    name: 'Task 1',
    dueDate: '08/08/2019',
    description: 'E-Business Lab 4'
});

//Setup the static assets directories
app.use(express.static('images'));
app.use(express.static('css'));
app.get('/', function (req, res) {
    let randomId = Math.round(Math.random() * 100);
    res.render('index.html', {
        username: "admin",
        id: randomId
    });
});

app.get('/newtask.html', function (req, res) {
    res.render('newtask.html');  
});

app.get('/listtasks.html', function (req, res) {
    //link db to html listtasks.html page
    res.render('listtasks.html', {taskDb: db});
});


app.listen(8080);