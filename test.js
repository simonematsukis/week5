let express = require('express');
let app = express();
let d = new Date();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/getDate', function (req, res) {
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    res.send(year + month + day);
    
});

app.get('/getTime', function (req, res) {
    let seconds = d.getSeconds();
    let minutes = d.getMinutes() + 1;
    let hours = d.getHours();
    res.send(hours + minutes + seconds);
});

app.listen(8080);

