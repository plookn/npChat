var socket = io.connect('http://localhost:8081');
socket.on('connect', function () {
    socket.emit('set username', 'daaan');
    socket.on('authenticated', function () {
        socket.emit('msg', 'steve', 'dammit, steve!');
    });
});
