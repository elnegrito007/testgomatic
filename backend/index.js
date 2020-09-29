var redis = require('redis'),
	redisClient = redis.createClient({host : 'redis-16446.c228.us-central1-1.gce.cloud.redislabs.com', port : 16446});
redisClient.auth('fDDMk1f5hN0cQe6Buv9xKliziGgnDssv',function(err,reply) {
	if(!err) {
		console.log(Date()," Ok: redis init");
	}else{
		console.log(Date()," Not: redis ");
	}
});

redisClient.on('ready',function() {
	console.log(Date()," Ok: redis ready");
});

redisClient.on('error',function() {
	console.log(Date()," Not: redis ready");
});



var WebSocketServer = require("ws").Server,
	http = require("http"),
	express = require("express"),
	app = express(),
	port = process.env.PORT || 4000;


app.get('/', function(req, res) {
	res.statusCode = 401;
	res.end('Unauthorized');
});

var server = http.createServer(app);
server.listen(port);

console.log(Date()," Ok: Server on port", port);

var wss = new WebSocketServer({server: server});

wss.options.maxPayload = 512 * 1024;
wss.options.server.timeout = 120000;
wss.options.server.keepAliveTimeout = 5000;

wss.on("connection", function(ws,req) {

	ws.on('message', function incoming(data) {

		try{

			var text = JSON.parse(data);
			var ejecucion = require('./modelos/'+text.r+'');
			ejecucion(text.d,redisClient,ws);

		}catch(e){
			ws.send(JSON.stringify({"e":true,"d":e}));
		}

	});

});
