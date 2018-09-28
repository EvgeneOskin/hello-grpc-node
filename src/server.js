const grpc = require('grpc');
const _ = require('lodash');
const messages = require('./protos/hello_pb');
const services = require('./protos/hello_grpc_pb');


function world(call, callback) {
  const first = call.request.getFirst()
  const last = call.request.getLast()


  const welcome = new messages.Welcome()
  welcome.setOutput(`Hello ${first} ${last}. I'm World!`)

  _.delay(() => callback(null, welcome), 2000);
}

function person(call) {
  let number = 1
  const names = []

  call.on('data', (name) => names.push(name))
  call.on('end', () => {
    names.forEach((name, i) => {
      const first = name.getFirst()
      const last = name.getLast()

      const welcome = new messages.Welcome()
      welcome.setOutput(`Hello ${first} ${last}. I'm World!`)

      _.delay(() => {
        call.write(welcome)
        if (i >= names.length - 1) {
          call.end()
        }
      }, 2000 * number);
    });
  });
}

function serve() {
  var server = new grpc.Server();
  server.addService(services.HelloService, { world, person });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

module.exports = serve
