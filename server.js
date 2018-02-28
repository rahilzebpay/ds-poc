const DeepstreamServer = require('deepstream.io');
const C = DeepstreamServer.constants
//const DSConfig = require('./config.yaml');
/*
The server can take
1) a configuration file path
2) null to explicitly use defaults to be overriden by server.set()
3) left empty to load the base configuration from the config file located within the conf directory.
4) pass some options, missing options will be merged with the base configuration
*/
const server = new DeepstreamServer();

// start the server


server.start()

const deepstream = require('deepstream.io-client-js');
const client = deepstream('localhost:6020');

const record = client.record.getRecord('user/rahil');

record.subscribe((data)=>{
    console.log(`Record changed ${data}`);
});