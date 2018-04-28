const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }, err => {
        res.status(400);
        res.send(err); 
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({todos});
    }, err => {
        res.status(400);
        res.send(err);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (ObjectID.isValid(id)) {
        Todo.findById(id).then(todo => {
            if (todo) {
                res.send(todo);
            }
            else {
                res.status(404).send();
            }
        }).catch(err => {
            res.status(400).send();
        });
    }
    else {
        res.status(404).send();
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id is not valid.');
    };

    Todo.findByIdAndRemove(id).then(document => {
        if (!document) {
            return res.status(404).send('Todo not found');
        }
        else {
            res.send(document);
        }
    }).catch(err => {
        res.status(400).send('Error caught');
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}.`);
});

module.exports = {
    app
};