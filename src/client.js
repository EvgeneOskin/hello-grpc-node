const messages = require('./protos/hello_pb');
const services = require('./protos/hello_grpc_pb');
const grpc = require('grpc');
const async = require('async');

const client = new services.HelloClient('localhost:50051', grpc.credentials.createInsecure());

function makeName(first, last) {
  const name = new messages.Name()
  name.setFirst(first)
  name.setLast(last)
  return name
}

const me = makeName('Eugene', 'Oskin')

client.world(me, (err, welcome) =>
  err ? console.error(err) : console.log(welcome.getOutput())
)

const names = [
  makeName('Gabriel', 'Márquez'),
  makeName('Martin', 'Fowler' ),
]

function callNames(callback) {
  const call = client.person();

  call.on('data', welcome => console.log(welcome.getOutput()));
  call.on('end', callback)

  names.forEach(name => call.write(name));
  call.end();
}

callNames(() => ({}))
