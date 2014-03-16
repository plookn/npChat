// Listening on the 'live-com' port
var io = require('socket.io').listen(8081);

io.sockets.on('connection', function (socket) {

    console.log('connected');
    
    /* SPECIAL EVENTS */
    socket.on('disconnect', function () {
        // Destructor
    });
    socket.on('message', function (message, callback) {
        // This is called on all messages 'sent'
    });


    var authenticated = false;
    
    // Clients need to send their username
    socket.on('set username', function (name) {
        // TODO: authentication
        socket.set('username', name, function () {
            console.log('Client %s authenticated', name);
            authenticated = true;
            socket.emit('authenticated');
        });
    });

    // Logged messages
    socket.on('msg', function (target, data) {
        socket.get('username', function (err, name) {
            if (err || !name || !authenticated) {
                console.error(err);
                unauthenticatedError(socket, err);
            }
            else {
                // TODO: Save messages via REST
                console.log('Live message from %s to %s: %s',
                            name, target, data);
            }
        });
    });
});


function unauthenticatedError(socket, err) {
    socket.emit('UnauthError', err);
}
