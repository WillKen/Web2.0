window.onload = function () {
	$(".unread").hide();	//操作前隐藏未读
	var buttonl = $("#button");
	for (var i = 0; i < buttonl.length; i++) 
	buttonl[i].addEventListener('mouseleave', reSet);	//鼠标离开，重置
	var apbs = $("#control-ring-container");
	apbs[0].addEventListener('click', getNum);
}

function reSet() {
	$(".button").css({"background-color":"blue"});
	$("#info-bar").css({"background-color":"gray"});
	$("#sum").html("");
	$("#letter").html("");
	$(".unread").hide();
}

function getNum() {
	var randomArray = randomSort();
	var code = ['A','B','C','D','E'];
	var order = code[randomArray[0]]+" "+code[randomArray[1]]+" "+code[randomArray[2]]+" "+code[randomArray[3]]+" "+code[randomArray[4]];
	$("#letter").html(order);
	$("."+code[randomArray[0]]+" .unread").show();
	$("."+code[randomArray[0]]+" .unread").html("...");
	auto(0, 0, randomArray);
}

function randomSort() {
	//随机进行排序
	var array = [0,1,2,3,4];
	var tmp;
	var Pos;
	for (var i = 4; i >= 0; i--) {
		Pos = Math.round(Math.random()*i);
		tmp = array[Pos];
		array[Pos] = array[i];
		array[i] = tmp;
	}
	return array;
}

function auto(i, currentSum, randomArray) {
	var code = ['A', 'B', 'C', 'D', 'E'];
	$("."+code[randomArray[i]]+" .unread").show();
	$("."+code[randomArray[i]]+" .unread").html("...");

	$.get("127.0.0.1", function(data, status) {
		$("."+code[randomArray[i]]+" .unread").html(data);
		$("."+code[randomArray[i]]).css({"background":"gray"});
		currentSum += parseInt(data);
		if (i != 4) 
				auto(i+1, currentSum, randomArray);
		else {
			$("#sum").html(currentSum);
			$("#info-bar").css({"background-color":"gray"});
			$(".button").css({"background-color":"gray"});
		}
	});
}