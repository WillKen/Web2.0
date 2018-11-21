// 17343155 张伟焜

var hole_total;
var start = 0; //初始状态是未开始
var score = 0; //得分
var time = 30; //倒计时 单位s
var pos = -1;  //输出位置
var clock;
var a;
var wrong;
var old_pos=-2;

window.onload = function() {
	var hole;
	var gamePart = document.getElementById("gamePart");
	for(var i = 0; i < 6; i++){        //将hole 显示出来
		for(var j = 0; j < 10; j++){
			hole = document.createElement("div");
			hole.className = "hole";
			gamePart.appendChild(hole);
			hole.addEventListener('click',judge);
		}
	}
	hole_total = document.getElementsByClassName("hole");
	document.getElementById("SS").onclick = currentstate;
	document.getElementById("gamePart").onmouseover = function(){
		this.className = "change";
	}
}

function currentstate(){
	if(start == 0){
		start = 1;
		pos = Math.round(Math.random()*60);
		pos = pos % 60;
		hole_total[pos].id = "appear";
		document.getElementById("scoreoutput").value = score;
		document.getElementById("timeoutput").value = time;
		clock = window.setInterval(countdown,1000);
		document.getElementById("state").value = "Gaming";
	}
	else if (start == -1) { //-1 为暂停状态；
		document.getElementById("state").value = "Gaming";
		start = 1;
		clock = window.setInterval(countdown, 1000);
	}
	else if (start == 1) {
		clearInterval(clock);
		document.getElementById("state").value = "Pausing";
		start = -1;
	}
}

function countdown(element){
	time--;
	document.getElementById("timeoutput").value = time;
	if(time <= 0){
		alert("Game Over! Your scoure is " + score);
		document.getElementById("state").value = "Game over";
		//重置 初始化
		hole_total[pos].id = "";
		pos = -1;
		time = 30;
		start = 0;
		score = 0;
		clearInterval(clock);
		clearTimeout(a);
	}
}

function judge(element){
	if(start == 1){                         //游戏开始
		if(event.target.id  == "appear"){   //打中
			hole_total[pos].id = "sure";
			score++;
			a = window.setTimeout(update,100);
			document.getElementById("scoreoutput").value = score;
		}
		else{
			event.target.id = "wrong";	 //未打中
			wrong=event.target;           
			score = score - 1;
			a = window.setTimeout(reset,100);
			document.getElementById("scoreoutput").value = score;
		}
	}
	else if(start == 0 || start == -1){
		// alert("Please open the game and continue!");
	}
}

function update(element){
	hole_total[pos].id = "";
	pos = Math.round(Math.random()*60);
	pos = pos % 60;
	if(old_pos==pos)
		a = window.setTimeout(update,0);
	hole_total[pos].id = "appear";
	old_pos=pos;
}

function reset(element){
	wrong.id="";
}