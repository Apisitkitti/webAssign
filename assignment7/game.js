window.onload = pageLoad;

function pageLoad(){
	document.getElementById("start").onclick = startGame;
}

function startGame(){
	alert("Ready");
	addBox();
	timeStart();
}

function timeStart(){
	var TIMER_TICK = 1000;
	var timer = null;
	var min = 0.5; // 0.5 minute
	var second = min*60; 
	var x = document.getElementById("clock");
	//setting timer using setInterval function
	timer = setInterval(timeCount,TIMER_TICK);
  
	
	function timeCount(){
    var empty = 0;
    x.innerHTML = second;
		var allbox = document.querySelectorAll("#layer div");
    if(allbox.length === empty)
    { 
      alert("You win")
      clearInterval(timer);
      timer = null;
      clearScreen();
    }
   
    if(second == empty) 
    {
      alert("Game over");
      clearInterval(timer);
      timer = null;
      clearScreen();
    }
    else
    {
      second--;
    }
		// จัดการเกี่ยวกับเวลา เช่น ถ้ายังมีกล่องเหลืออยู่ เวลาจะลดลงเรื่อยๆ 
		// ถ้าไม่มีกล่องเหลือแล้ว และเวลายังเหลืออยู่จะขึ้นว่า You win!
		// ถ้าเวลาหมด แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen
	}
}

function addBox(){
	// สร้างกล่องตาม input ที่เราใส่ 
	var numbox = document.getElementById("numbox").value ;
	var gameLayer = document.getElementById("layer") ;
	var colorDrop =document.getElementById("color").value ;
	for (var i =0; i<numbox;i++){
		var tempbox = document.createElement("div");
		tempbox.className = "square" ;
		tempbox.id = "box"+i;
    tempbox.classList.add(colorDrop);
		tempbox.style.left = Math.random() * (500 - 25) + "px";
		tempbox.style.top = Math.random() * (500 - 25) + "px";
		//add element to HTML node
		gameLayer.appendChild(tempbox);

		bindBox(tempbox);
	}
}

function bindBox(box){
	//เมื่อกดแล้ว กล่องจะหายไป
	box.onclick = function(){
		box.parentNode.removeChild(box);
	}
}

function clearScreen(){
	// ทำการลบ node ของกล่องทั้งหมด ออกจาก หน้าจอ
	var allbox = document.querySelectorAll("#layer div") ;

	//delete all  div
	for (var i=0;i<allbox.length;i++){
		allbox[i].remove();
	}
}




