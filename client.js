const deepstream = require('deepstream.io-client-js');
const client = deepstream('localhost:6020');
const inquirer = require('inquirer');

//loggin
client.login({}, ()=>{
    console.log('logged in');
});

const record = client.record.getAnonymousRecord();
record.setName('user/rahil');


// record.whenReady(record => {
//     console.log(`Record is now ready`)
// });

record.subscribe((data)=>{
    console.log('Record Changed');
    console.log(data);
});

const users = client.record.getList( 'users' );
users.subscribe( function(entries){
    console.log(`Entries in Lists ${entries}`);
}, false );

users.setEntries(['user/rahil']);


var user = client.record.has('user/rahil', (error, hasRecord) => {
    console.log(`The record is ${hasRecord}`);
});

client.record.setData('user/rahil', { status: 'active'});

client.record.snapshot('user/rahil', (error, data) => {
    console.log(`Snapshot data is %s`, JSON.stringify(data));
});

client.record.listen('user/.*', (eventName, isSubscribed, response) => {
    // see tutorial for more details
    console.log(`event Name is ${eventName}`);
    console.log(`isSubscribed is ${isSubscribed}`);
});


const inq = function(){
    inquirer.prompt([{type: 'input', name: 'status', message: 'Change the status of Rahil'}]).then(answers => {
        client.record.setData('user/rahil', { status: answers.status}, ()=>{
            inq();
        });
    });
};

inq();


console.log('hre');