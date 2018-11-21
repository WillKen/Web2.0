// 17343155 张伟焜
 



// 设计思路：（针对gameaera子元素div） 
// 	id="picN" 表示第N块图案（N为1~15）,其中“blank”表示空白。 即用id记录div的图片样式
// 	class="pic/blank rowX colY" 表示该div的显示位置在第X行第Y列（X，Y均为0~3）。 即用class记录div的显示位置。
// 	pos[x][y],二维数组，它的值为1~15，用以创建随机位置，并用来判断最终是否完成拼图，注意：pos[x][y]始终与该位置(x行y列)的div的id相同。
	
// 	初始化：
// 		产生16个div,15个pic,1个blank,初始id,class,pos[][]。
// 	拼图块打乱原理：
// 		产生随机数。如，针对第一块，产生1~15的随机数，将随机数指向的拼图块的id和pos[][]与第一块交换；第二块，第三块以此类推。
// 	拼图移动原理：
// 		点击图片时，判断其显示位置是否与空白显示位置相邻，若相邻则能移动，交换空白显示位置和此图片的显示位置。(交换pos[][]和class)
// 		注：id不变，因为变了显示位置，所以不需要再变图片内容。若采用不改变显示位置(不交换class)，只改变图片内容(只交换id),则在移动时，会出现图片闪烁，影响用户体验。
// 	拼图恢复原理：
// 		首先pos[][]恢复，即依次赋值1~15，最后一块是空白，记为0。
// 		接着，读取第0行第0列的div,修改其class和id；接着第0行第1列，以此类推。





var begin = 0;	//记录当前游戏状态（游戏是否开始）
var win=false;	//是赢得的游戏
var pos = [[0,0,0,0], [0,0,0,0,], [0,0,0,0], [0,0,0,0]];	//4*4二维数组记录位置
var second = 0;	//记录时间
var steps = 0; //记录步数
var clock;	//时钟

// window.onload事件
window.onload = function() {
	var picture;
	var blankPicture;
	// 创建div(15个)
	var creations = document.createDocumentFragment();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (i==3&j==3)	//不创建第16个
				break;
			picture = document.createElement("div");
			picture.id = "pic"+(4*i+j+1);	//id: pic1~pic15
			picture.className = "pic row"+ i +" col" + j;	//class 记录显示位置
			picture.addEventListener('click', move);
			creations.appendChild(picture);
		}
	}
	// 创建第十六个div（空白div）
	blankPicture = document.createElement("div");
	blankPicture.id = "blank";
	blankPicture.className = "blank row3 col3";
	blankPicture.addEventListener('click', move);
	creations.appendChild(blankPicture); 
	//使其成为gamearea子元素
	document.getElementById("gamearea").appendChild(creations);
	// 按钮事件
	document.getElementById("start").onclick = start;
	document.getElementById("recover").onclick = recover;
} 

//开始游戏
function start() {
	//给每块拼图编号	
	for (var i = 0; i < 4; i++) { 
		for (var j = 0; j < 4; j++) {
			if(i==3&&j==3)
				break;
			pos[i][j] = 4*i+j+1;	//编号1~15对应id
		}
	}
	pos[3][3] = 0;	//空白位置记为0
	//打乱拼图(pos记录id)
	var r;
	var hold;
	do{ 
		for (var i = 14; i >= 0; i--) {
			r = Math.round(Math.random()*i);
			hold = pos[Math.floor(i/4)][i%4];
			pos[Math.floor(i/4)][i%4] = pos[Math.floor(r/4)][r%4];
			pos[Math.floor(r/4)][r%4] = hold;
		}
	}while(!isvalid())	//如果不能被还原 则重新打乱拼图

	var picture = document.getElementsByClassName("pic"); 
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(i==3&&j==3)
				break;
			picture[4*i+j].id = "pic"+pos[i][j]; //按照pos的记录更换ID
			picture[4*i+j].className = "pic row"+ i +" col"+ j;	//用class记录打乱后的显示位置
		}
	}
	var blank = document.getElementsByClassName("blank");
	blank[0].className = "blank row3 col3";
	blank[0].id = "blank";
	begin = 1;
	second = 0;
	clearInterval(clock);
	steps = 0;
	document.getElementById("step").value="";
	document.getElementById("time").value = "";
	clock= window.setInterval(countTime,1000);
	document.getElementById("information").textContent = "Game in progress……";
}

//计时
function countTime(element){
	if(begin == 1&&win==false) 
		second++;
	document.getElementById("time").value = second;	
}

//判断拼图是否能被还原,这一部分的算法来自百度
function isvalid() { 
	var count = 0;
	for (var i = 0; i < 15; i++) {
		for (var j = i+1; j < 15; j++) {
			if (pos[Math.floor(i/4)][i%4] > pos[Math.floor(j/4)][j%4]) 
				count++;
		}
	}
	if (count%2 == 0) 
		return true;
	else 
		return false;
}

//复原
function recover() {
	if(!win){
		begin = 0;
		second = 0;
		clearInterval(clock);
		document.getElementById("time").value = "";	
		steps=0;
		document.getElementById("step").value="";
		document.getElementById("information").textContent = "Press \"start\" to do the puzzle!";
		//pos复原
		for (i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				if(i==3&&j==3)
					break;
				pos[i][j] = 4*i+j+1;	//编号1~15对应id
			}
		}
		pos[3][3] = 0;
		//class 和 id 复原
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if(i==3&&j==3){
					var x = document.getElementsByClassName("row3 col3")[0];
					x.className="blank row3 col3";
					var x = document.getElementsByClassName("blank row3 col3")[0];
					x.id="blank"
					break;
				}
				var x = document.getElementsByClassName("row"+ i +" col"+ j)[0];
				x.className="pic row"+ i +" col"+ j;
				x.id="pic"+pos[i][j];
			}
		}
	}
}

//移动拼图
function move(event) {
	if (begin == 0 || event.target.id == "blank"||win==true) {
		return;
	}
	var x, y;	//鼠标点击的位置
	var x_blank, y_blank;	//空白的位置
	var judge=false;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ("pic"+pos[i][j] == event.target.id) { //找到当前点击的目标的坐标
				x = i;
				y = j;
			}
			if (pos[i][j] == 0) { //找到空白块的位置坐标
				x_blank = i;
				y_blank = j;
			}
		}
	}
	//点击位置是否与空白位置相邻
	if (x_blank == x) { 
		if (y_blank-y== -1||y_blank-y == 1) {
			judge = true;
		} 
	} else if (y_blank == y) {
		if (x_blank-x == -1||x_blank-x == 1) {
			judge = true;
		}
	}
	//满足交换条件 开始移动
	if (judge) {
		steps++;	//步数增加
		document.getElementById("step").value = steps;
		//交换pos
		pos[x_blank][y_blank] = pos[x][y];
		pos[x][y] = 0;
		//交换显示位置（class 记录显示位置）
		var blank = document.getElementById("blank");
		blank.className = "blank row" + x + " col" + y;
		event.target.className = "pic row" + x_blank + " col" + y_blank;
	}
	//判断游戏是否结束（是否win）
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(i==3&&j==3)
				break;
			if (pos[i][j] != 4*i+j+1)
				return;
		}
	}
	//获胜 游戏结束！
	begin = 0;
	win=true;
	document.getElementById("information").textContent = "You win!"
}


