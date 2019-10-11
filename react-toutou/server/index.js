const numCPUs = require('os').cpus().length;
const server = require('./server');
const cluster = require('cluster');
// console.log('numCPUs::', numCPUs);


// server.init();



if (cluster.isMaster) {
	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
}
else {
	server.init();

	console.log('?€????:', process.pid);
}