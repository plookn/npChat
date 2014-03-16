var restify = require('restify');


function storeMessage(req, res, next) {
    res.send(200, "OK\n");
    console.log('%s message to %s: %s',
                req.body.user, req.params.target,
                req.body.msg);
}


/* INIT SERVER */
var server = restify.createServer();
// POST data is stored in req.body
server.use(restify.bodyParser({ mapParams: false }));


/* ROUTING */
server.post('/msg/:target', storeMessage);


/* START RESTIFY SERVER */
server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
