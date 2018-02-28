const deepstream = require('deepstream.io-client-js');
const client = deepstream('localhost:6020');

const record = client.record.getRecord('trade/BTC/INR/book');

//loggin
client.login({}, ()=>{
    console.log('logged in');
});

record.subscribe((data)=>{
    console.log(`Record Changed -->`);
    console.log(JSON.stringify(data));
})