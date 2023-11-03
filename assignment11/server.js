const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const { promises } = require('dns');
const { rejects } = require('assert');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'img/');
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

//ทำให้สมบูรณ์
app.post('/profilepic', (req,res) => {
    
    return res.redirect('feed.html')
 })

//ทำให้สมบูรณ์
// ถ้าต้องการจะลบ cookie ให้ใช้
// res.clearCookie('username');
app.get('/logout', (req,res) => {
    res.clearCookie('username');
    return res.redirect('index.html');
})

//ทำให้สมบูรณ์
app.get('/readPost', async (req,res) => {
    const WaitForReadFIle  = await readJson('js/postDB.json');
    var ChangeFile = JSON.parse(WaitForReadFIle);
    res.send(ChangeFile);
})

//ทำให้สมบูรณ์
app.post('/writePost',async (req,res) => {
  const WaitForReadFIle  = await readJson('js/postDB.json');
  var ChangeFile = JSON.parse(WaitForReadFIle);
  const postUpload = await updateMsg(req.body,ChangeFile,'js/postDB.json')
  res.send(postUpload);
})

//ทำให้สมบูรณ์
app.post('/checkLogin',async (req,res) => {
    const checkLogin = await readJson('js/userDB.json');
    var information = JSON.parse(checkLogin);
    var key = Object.keys(information);
    var isTrue = false;
    for(var data_info = 0; data_info<key.length; data_info++)
    {
      if(req.body.username == information[key[data_info]].username 
        && req.body.password == information[key[data_info]].password )
      {
        res.cookie('username',information[key[data_info]].username);
        res.cookie('img',information[key[data_info]].img);
        console.log('Login Pass');
        isTrue = true;
        return res.redirect('feed.html');
        
      }
    }
    if(isTrue == false)
    {
      console.log('Login Fail');
      isTrue = false;
      return res.redirect('index.html?error=1')
     
    }
})


//ทำให้สมบูรณ์
const readJson = (file_name) => {
    return new Promise((resolve,reject) =>{
      fs.readFile(file_name,'utf-8',(err,data)=>
      {
        if(err)
        {
          reject(err)
          console.log("error read");
        }
        else
        {
          resolve(data);
          console.log('read pass');
        }
      });
    });
}
const updateMsg = (new_msg, data, file_name) => {
  return new Promise((resolve) => { 
     const FileRead = JSON.parse(data);
     var keys = Object.keys(FileRead);
     data['post'+ [keys.length+1]] = {
      user:new_msg.user,
      message:new_msg.message,
     };
     console.log("update fininsh");
     resolve(writeJson(JSON.stringify(data),file_name));
  });
}

//ทำให้สมบูรณ์
const writeJson = (data,file_name) => {
    return new Promise((resolve,reject) =>{
      fs.writeFile(file_name,data,(err)=>
      {
        if(err)
        {
          reject(err);
          console.log('Write fail');
        }
        else
        {
          resolve(data);
          console.log("Write Post Pass");
        }
      });
    })
};

//ทำให้สมบูรณ์
const updateImg = async (username, fileimg) => {
    
}

 app.listen(port, hostname, () => {
        console.log(`Server running at   http://${hostname}:${port}/`);
});
