
var http = require('http');
var fs = require('fs');
let fileName = 'index.html';
const querystring = require('url');

http.createServer(function (request, response) {
    fileName = 'index.html';
    var url = request.url;
    console.log('request ', url);
    
    var q = querystring.parse(request.url, true).query;
    console.log(q.username);
    console.log(q);
        if(q.username) {
            if (q.username == "admin" && q.password == "pass" ) {

                fileName = 'mainpage.html';
            } else {
    
                fileName = 'accessdenied.html';
            }
        }
        
    fs.readFile(fileName, function (error, content) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content, 'utf-8');
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');