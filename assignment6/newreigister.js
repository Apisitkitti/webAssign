window.onload = pageLoad;
function pageLoad(){
	var form = document.getElementById("myForm");
  form.onsubmit = validateForm;
}

function validateForm() {
    var password = document.forms["myForm"]["password"].value;
    var password1 = document.forms["myForm"]["Retype"].value;
    if(password1 != password)
    {
      document.getElementById("errormsg").innerHTML = "error";
      alert("Pls input again");
      return false;
    }
}