
const { json } = require('express');
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
const allowedUsers = [
  {"username":"Andi", "password":"Russ"},
  {"username":"test", "password":"test"},
  { "username":"sokrates", "password":"dialog" },
  { "username":"platon", "password":"idee" },
  { "username":"aristoteles", "password":"stoffundform" },
  { "username":"kant", "password":"aufklaerung" } 
];

app.use(express.json());

app.use((req, res, next) => {
  try{
    let credentials = JSON.parse(req.headers.authorization);
    if(credentials.username && credentials.password && credentials.length != 2){
      if(checkCredentials(credentials)){         
        res.status(200);
        res.statusMessage = "Hello " + credentials.username;  
        next();
      }
      else{
        res.status(401);
        res.statusMessage = "Access denied";
      }
    }
    else{
      res.status(401);
      res.statusMessage = "Access denied";
    }
    next();
  } catch(ex){    
    res.status(404).send('NOT FOUND');
  }
})

app.use((req, res, next) => {
  let msg = `${formatDate()} ${req.method} ${req.url} ${res.statusCode}-${res.statusMessage}`;
  req.msg = msg;
  
  next(); 
})

app.use((req, res, next) => {
  console.log(req.msg);
  next();
})

app.get('/whoiam', (req, res) => {
  res.send(res.statusMessage);
})

app.get('/helloExpress', (req, res) => {
  res.send('Hello World! Express up and running')
})

app.listen(port, () => {
  console.log(`Chat app listening at http://${hostname}:${port}/`)
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

function checkCredentials(credentials){
  if(allowedUsers.some(n => {
    return (n.username == credentials.username && n.password == credentials.password);
  }))
    return true;
  return false;
}

