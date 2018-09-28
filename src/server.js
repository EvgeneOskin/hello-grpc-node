const grpc = require('grpc');

const messages = require('./protos/hello_pb');
const services = require('./protos/hello_grpc_pb');

function world(call, callback) {
  const { first, last } = call.request;
  callback(null, messages.Welcome({
    output: `Hello ${first} ${last}. I'm World!`
  }));
}

function person(call, callback) {
  call.on('data', function(name) {
    const { first, last } = name;
    call.write(messages.Welcome({
      output: `Hello ${first} ${last}.`
    }));
  });
  call.on('end', () => call.end());
}

function serve() {
  var server = new grpc.Server();
  server.addService(services.HelloService, { world, person });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

module.exports = serve
