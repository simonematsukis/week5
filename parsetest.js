var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
    console.log('URL=' + req.url);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    var q = url.parse(req.url, true).query;
    console.log( q);
    var txt = q.year + " " + q.month;
    res.end(txt);
}).listen(8080);