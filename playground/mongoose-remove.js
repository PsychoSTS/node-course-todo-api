const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

// Remove all todos
Todo.remove({}).then(result => {
    console.log(result);
});

// Delete the todo first found but returning the document back
Todo.findOneAndRemove({}).then(document => {

});

Todo.findOneAndRemove('asde').then(document => {

});