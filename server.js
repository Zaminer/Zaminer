const express = require('express')
const app = express()
const port = 2604
const hostname = 'chatservice.informatik.htl-vil';

app.use(express.json());

app.get('/helloExpress', (req, res) => {
  res.status(200).send('Hello World! Express up and running')
})

app.listen(port, () => {
  console.log(`Chat app listening at http://${hostname}:${port}/helloExpress`)

})
