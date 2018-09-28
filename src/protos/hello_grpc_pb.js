// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_hello_pb = require('../protos/hello_pb.js');

function serialize_Name(arg) {
  if (!(arg instanceof protos_hello_pb.Name)) {
    throw new Error('Expected argument of type Name');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Name(buffer_arg) {
  return protos_hello_pb.Name.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Welcome(arg) {
  if (!(arg instanceof protos_hello_pb.Welcome)) {
    throw new Error('Expected argument of type Welcome');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_Welcome(buffer_arg) {
  return protos_hello_pb.Welcome.deserializeBinary(new Uint8Array(buffer_arg));
}


var HelloService = exports.HelloService = {
  world: {
    path: '/Hello/World',
    requestStream: false,
    responseStream: false,
    requestType: protos_hello_pb.Name,
    responseType: protos_hello_pb.Welcome,
    requestSerialize: serialize_Name,
    requestDeserialize: deserialize_Name,
    responseSerialize: serialize_Welcome,
    responseDeserialize: deserialize_Welcome,
  },
  person: {
    path: '/Hello/Person',
    requestStream: true,
    responseStream: true,
    requestType: protos_hello_pb.Name,
    responseType: protos_hello_pb.Welcome,
    requestSerialize: serialize_Name,
    requestDeserialize: deserialize_Name,
    responseSerialize: serialize_Welcome,
    responseDeserialize: deserialize_Welcome,
  },
};

exports.HelloClient = grpc.makeGenericClientConstructor(HelloService);
