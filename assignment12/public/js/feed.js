// check ว่ามีการ set cookies หรือยังถ้ามีจะไปยัง feed.html แต่ถ้าไม่มีจะกลับไปที่ login.html
function checkCookie(){
	var username = "";
	if(getCookie("username")==false){
		window.location = "login.html";
	}
}

checkCookie();
window.onload = pageLoad;

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

function pageLoad(){
	document.getElementById('postbutton').onclick = getData;
	document.getElementById('displayPic').onclick = fileUpload;
	document.getElementById('fileField').onchange = fileSubmit;
	var username = getCookie('username');
  var timer = null;
	document.getElementById("username").innerHTML = username;
	console.log(getCookie('img'));
	showImg('img/'+getCookie('img'));
	readPost();
}
function Refresh(){
  readPost();
}
async function getData(){
  timer = setInterval(1000,Refresh());
	var msg = document.getElementById("textmsg").value;
	document.getElementById("textmsg").value = "";
  await writePost(msg);
  await readPost();
}

function fileUpload(){
	document.getElementById('fileField').click();
}

function fileSubmit(){
	document.getElementById('formId').submit();
}

// แสดงรูปในพื้นที่ที่กำหนด
function showImg(filename){
	if (filename !==""){
		var showpic = document.getElementById('displayPic');
		showpic.innerHTML = "";
		var temp = document.createElement("img");
		temp.src = filename;
		showpic.appendChild(temp);
	}
}

// complete it
async function readPost(){
	let read = await fetch("/readPost")
  let showContent = await read.json();
  showPost(showContent);
}

// complete it
async function writePost(msg){
	let response = await fetch ("/writePost",{
    method:"POST",
    headers:{
       Accept: 'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      user:getCookie("username"),
      message: msg,
    }),
  });
  
}

// แสดง post ที่อ่านมาได้ ลงในพื้นที่ที่กำหนด
function showPost(data){
	var keys = Object.keys(data);
	var divTag = document.getElementById("feed-container");
	divTag.innerHTML = "";
	for (var i = keys.length-1; i >=0 ; i--) {

		var temp = document.createElement("div");
		temp.className = "newsfeed";
		divTag.appendChild(temp);
		var temp1 = document.createElement("div");
		temp1.className = "postmsg";
		temp1.innerHTML = data[keys[i]]["post"];
		temp.appendChild(temp1);
		var temp1 = document.createElement("div");
		temp1.className = "postuser";
		
		temp1.innerHTML = "Posted by: "+data[keys[i]]["username"];
		temp.appendChild(temp1);
		
	}
}