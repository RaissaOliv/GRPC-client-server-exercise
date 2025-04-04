const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');


const packageDefinition = protoLoader.loadSync('calculator.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const calculatorProto = grpc.loadPackageDefinition(packageDefinition).calculator;

const client = new calculatorProto.Calculator('localhost:50051', grpc.credentials.createInsecure());


client.Sum({ a: 7, b: 5 }, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('O resultado da soma é:', response.result);
    }
});