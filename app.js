var WebSocketServer = require('websocket').server;
var http = require('http');
var schedule = require('node-schedule');

var server = http.createServer(function(request, response) {
    
});

server.listen(1337, function() { 
    console.log((new Date()) + ' Server is listening on port 1337');
});

wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        if(message.type === 'utf8') {
            console.log(message);
            connection.sendUTF(message.utf8Data);
        }
        else if(message.type === 'binary') {
            console.log(message);
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(connection) {
        console.log('close');
    });
    
    // execute the sceduler in every 11 minutes
    var rule = new schedule.RecurrenceRule();
    rule.minute = 11;

    schedule.scheduleJob(rule, function() {
        console.log('schedule event sent');
        connection.sendUTF('schedule'); 
    });
});