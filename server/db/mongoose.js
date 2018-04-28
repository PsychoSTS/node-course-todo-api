const mongoose = require('mongoose');

// Tell mongoose what Promises to use
mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
}