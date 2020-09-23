const express = require('express')
const app = express()
const port = 3000
const hostname = 'localhost';

app.use(express.json());

app.get('/helloExpress', (req, res) => {
  res.status(200).send('Hello World! Express up and running')
})

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}/helloExpress`)
})
