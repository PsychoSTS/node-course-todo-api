// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB server...`);
    }

    console.log(`Connected to MongoDB server!`);
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5ade27dba34bb12bc08c022f')
    // }).toArray().then((documents) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(documents, null, 2));
    // }, (err) => {
    //     console.error('Unable to fetch todos.');
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.error('Unable to fetch todos.');
    });

    db.collection('Users').find({
        name: 'Roelof'
    }).toArray().then((documents) => {
        console.log(JSON.stringify(documents, null, 2));
    }, (err) => {
        console.error('Unable to fetch todos.');
    });

    // client.close();
});