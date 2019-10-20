const express = require('express')
const app = express();
const port = 3000;
const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/todos', (req, res) => {
  res.json([
    {
      "_id": 1,
      "name": "Item 1",
      "done": false
    },
    {
      "_id": 2,
      "name": "Item 2",
      "done": false
    },
    {
      "_id": 3,
      "name": "Item 3",
      "done": false
    }
  ])
})

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
