const grpc = require('grpc');

const messages = require('./protos/hello_pb');
const services = require('./protos/hello_grpc_pb');

function world(call, callback) {
  const first = call.request.getFirst()
  const last = call.request.getLast()

  const welcome = new messages.Welcome()
  welcome.setOutput(`Hello ${first} ${last}. I'm World!`)

  callback(null, welcome);
}

function person(call, callback) {
  call.on('data', (name) => {
    const first = name.getFirst()
    const last = name.getLast()

    const welcome = new messages.Welcome()
    welcome.setOutput(`Hello ${first} ${last}. I'm World!`)

    call.write(welcome)
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
