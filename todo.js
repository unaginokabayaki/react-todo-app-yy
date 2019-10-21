const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define todso schema
const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
})

todoSchema.statics.all = function(callback) {
  return Todo.find({}, function(err, todos) {
    callback({todos: todos});
  })
}

todoSchema.statics.createDocument = function(params, callback) {
  return Todo.create({ text: params.text, done: params.done },
    function(err, todo) {
      if (err) return handleError(err);
      callback(todo);
    }) 
}

todoSchema.statics.updateDocument = function(id, params, callback) {
  return Todo.findOneAndUpdate({_id: id},
                              {
                                text: params.text,
                                done: params.done
                              }, function(err, todo) {
                                callback(todo)
                              })
}

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;