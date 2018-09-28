const messages = require('./protos/hello_pb');
const services = require('./protos/hello_grpc_pb');
const grpc = require('grpc');
const { promisify } = require('util');

const client = new services.HelloClient('localhost:50051', grpc.credentials.createInsecure());


const me = new messages.Name()
me.setFirst('Eugene')
me.setLast('Oskin')
promisify(client.world)(me)
  .then(console.log)
  .catch(console.error)

const names = [
  new messages.Name({ first: 'Gabriel', last: 'Márquez' }),
  new messages.Name({ first: 'Martin', last: 'Fowler' })
]

function callNames(callback) {
  const call = client.person();

  call.on('data', welcome => console.log(welcome.output));
  call.on('end', callback)

  names.forEach(name => call.write(name));
  call.end();
}
/*
promisify(callNames)()
  .then(console.log)
  .catch(console.error)
  */
