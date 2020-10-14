/* ************************************************************************************** */
/*                             Chat App                                                   */
/*                                                                                        */
/*    Zaminer Marco                                                                       */
/*    2020/21                                                                             */
/* ************************************************************************************** */


const fs = require('fs');
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
app.use(logging);
app.use(authenticate);

app.get('/whoiam', (req, res) => {
  res.send(req.user);
})
app.get('/helloExpress', (req, res) => {
  res.send('Hello World! Express up and running')
})
app.listen(port, () => {
  console.log(`Chat app listening at http://${hostname}:${port}/`)
})



function logging (req, res, next) {
  let logger = fs.createWriteStream('debug.log.md');
  let msg = `${formatDate()} ${req.method} ${req.url}`;
  req.msg = msg;
  startLog();
  log();
  printReqMsg(req, res, next); 
}
function authenticate (req, res, next) {
  let credentials = req.headers.authorization;

  if(credentials == undefined){
    res.status(401).send("Access denied. Provide a authorization header");
    return;
  }

  try{
    credentials = JSON.parse(credentials);
  } catch (ex){
    res.status(401).send("Access denied. Provide authorization header in JSON-Format");
    return;
  }

  if(Object.keys(credentials).length !== 2 || !credentials.username || !credentials.password){
    res.status(401).send("Access denied. Provide a valid credentials-object");
    return;
  }

  if(!checkCredentials(credentials)){
    res.status(401).send("Access denied. User does not exist");
    return;
  }

  delete credentials.password;
  req.user = credentials.username;
  next();
}


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
function setStatus(res, code, message){
  res.status(code);
  res.statusMessage = message;
}
function printReqMsg (req, res, next) {
  console.log(req.msg);
  next();
}
function startLog(){

}
function log(msg, data, type){

}