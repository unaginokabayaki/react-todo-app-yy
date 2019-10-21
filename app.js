const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const bodyParser = require('body-parser');
const Todo = require('./todo.js');

router.get('/', (req, res) => res.send('Hello World!'));

router.route('/todos')
  .get((req, res) => {
    Todo.all(function(data) {
      console.log('Retrieving all Todos');
      res.json(data);
    })
  })
  .post((req, res) => {
    Todo.createDocument(req.body, function(data) {
      console.log('Todo created with id ${data._id}');
      res.json(data);
    })
  })

app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
