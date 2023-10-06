window.onload = loginLoad;
function loginLoad(){
  var form = document.getElementById("myLogin");
  form.onsubmit = checkLogin;
}

function checkLogin(){
	//ถ้าตรวจสอบแล้วพบว่ามีการ login ไม่ถูกต้อง ให้ return false ด้วย
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const Username = urlParams.get("username");
  const password = urlParams.get("password");
  var usernamelog = document.forms["myLogin"]["username"].value;
  var passwordlog = document.forms["myLogin"]["password"].value
  if(usernamelog != Username || passwordlog != password)
  { 
      alert("Wrong");
      return false
  }
  else
  {
    alert("Now login");
  }
}

			