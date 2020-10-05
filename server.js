
/*************************************************************************************** */
/*                            Chat App                                                   */
/*                                                                                       */
/*   Zaminer Marco                                                                       */
/*   2020/21                                                                             */
/*************************************************************************************** */

const express = require('express')
const app = express()
const port = 2604
const hostname = 'chatservice.informatik.htl-vil';

app.use(express.json());

app.use((req, res, next) => {
  let msg = `${formatDate()} ${req.method} ${req.url}`;
  res.msg = msg;
  //console.log(`${formatDate()}`);
  //res.status(403).send("canceled");
  next(); // als parameter weitergeben
})

app.use((req, res, next) => {
  console.log(res.msg);
  next();
})

app.get('/helloExpress', (req, res) => {
  res.status(200).send('Hello World! Express up and running')
})

app.listen(port, () => {
  console.log(`Chat app listening at http://${hostname}:${port}/helloExpress`)
})


function formatDate(){
  var stunden, minuten, sekunden;
  var StundenZahl, MinutenZahl, SekundenZahl;
  var heute;

  heute = new Date();
  StundenZahl = heute.getHours();
  MinutenZahl = heute.getMinutes();
  SekundenZahl = heute.getSeconds();

  stunden = StundenZahl+":";
  if (MinutenZahl < 10) {minuten = "0" + MinutenZahl + ":";}
    else {minuten = MinutenZahl + ":";}
  if (SekundenZahl < 10) {sekunden = "0" + SekundenZahl + " ";}
    else {sekunden = SekundenZahl + " ";}
  zeit = stunden + minuten + sekunden + " Uhr";
  return zeit;
}