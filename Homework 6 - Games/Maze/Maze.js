// 17343155 张伟焜

var start = false;
var win = true;
var cheat = false;

window.onload = function() {
	var walls = document.getElementById('walls');
	walls.addEventListener("mouseover",handleOver);
	walls.addEventListener("mouseout",handleOut);
	// 鼠标移动到‘S’，则初始化
	document.getElementById('start').onmouseover = function() {
		start = true;
		win = true;
		cheat = false;
		document.getElementById('result').innerText = "Game Strat!";
		document.getElementById('result').className = "resultShow";
	}
	// 鼠标移动到‘E’，判断结果
	document.getElementById('end').onmouseover = function() {
		if(start == true) {
			if(cheat == true) 
				document.getElementById('result').innerText = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!";
			else
				document.getElementById('result').innerText = "You Win";
		}
		start = false;
		document.getElementById('result').className = "resultShow";
	}
	//鼠标离开游戏区域则判断为cheat
	document.getElementById('gamePart').onmouseleave = function() {
		cheat = true;
	}
}
// 当鼠标移动到墙上,变红色，游戏结束，显示结果
function handleOver(event) {
	if(start == true) {
		event.target.className = "red";
		document.getElementById('result').innerText = "You Lose";
		document.getElementById('result').className = "resultShow";
		start = false;
	}
}
// 当鼠标回到墙内，墙变成灰色
function handleOut(event) {
	event.target.className = "grey";
}

