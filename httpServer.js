var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');
//var index = 

var port = process.env.PORT || 8000;

//http.createServer function
var server = http.createServer(function(req, res){
    if(req.method === 'GET' && req.url === '/pets/2') {
        res.statusCode = 404
        res.setHeader('Content-Type', 'plain/text')
        res.end('Not found')
    }else if(req.method === 'GET' && req.url === '/pets/-1'){
        res.statusCode = 404
        res.setHeader('Content-Type', 'plain/text')
        res.end('Not found')
    }else if(req.method === 'GET' && req.url === '/pets') {
        fs.readFile('pets.json', 'utf8', function(err, petsJson) {
            if(err) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'plain/text')
                res.end('Not found')
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(petsJson)
        })    
    }else if(req.method === 'GET' && req.url === '/pets/0') {
        fs.readFile('pets.json', 'utf8', function(err, petsJson) {
            if(err) {
                res.statusCode = 404
                res.setHeader('Content-Type', 'plain/text')
                res.end('Not found')
            }
            var index = JSON.parse(petsJson);
            var petsJson = JSON.stringify(index[0]);
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(petsJson);
        })  
    }else if(req.method === 'GET' && req.url === '/pets/1') {
        fs.readFile('pets.json', 'utf8', function(err, petsJson) {
            if(err) {
                console.error(err.stack)
                res.statusCode = 404
                res.setHeader('Content-Type', 'plain/text')
                res.end('Not found')
            }
            var index = JSON.parse(petsJson);
            var petsJson = JSON.stringify(index[1]);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json')
            res.end(petsJson);
        })
        
    }
    
}) 

//server.listen function
server.listen(port, function(){
    console.log(`Listening on port: ${port}`);
})
