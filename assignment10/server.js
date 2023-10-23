var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);

var fs = require('fs');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


// read from file to user
//ทำให้สมบูรณ์
app.get('/inmsg', async (req, res) => {
  const WaitForReadFile = await readMsg();
  res.send(WaitForReadFile);
})

//from user, write data to file
//ทำให้สมบูรณ์
app.post('/outmsg', async (req, res) => {
  const WaitForReadFile = await readMsg();
  const content = await updateMsg(req.body,WaitForReadFile);
  res.json(content);
    
})  

// read json data from file
//ทำให้สมบูรณ์
const readMsg = () => {
  return new Promise((resolve,reject) => {
    fs.readFile('log.json','utf8',(err,data)=>{
      if(err)
      {
        reject(err);
        console.log("error read");
      }
      else
      {
        resolve(JSON.parse(data));
        console.log("read pass");
      }
    });  
  })
} 

// update json data
//ทำให้สมบูรณ์
const updateMsg = (new_msg, jsonFile) => {
  return new Promise((resolve) => { 
     jsonFile.dataMsg.push({
      time:new_msg.time,
      user:new_msg.user,
      message:new_msg.message,
     });
     resolve(writeMsg(JSON.stringify(jsonFile)));
  });
}

// write json data to file
//ทำให้สมบูรณ์
const writeMsg = (data) => {
  return new Promise((resolve,reject) => {
    fs.writeFile('log.json',data,(err)=>{
      if(err)
      {
        reject(err);
        console.log("Write error");
      }
      else
      {
        resolve(data);
        console.log("Write pass");
      }
    });
    
})
};

var server = http.listen(3001, () => {
  console.log('server is running on port http://localhost:'+ server.address().port);
});