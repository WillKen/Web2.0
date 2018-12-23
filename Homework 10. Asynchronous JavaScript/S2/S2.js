// JUDGE用来判断状态:
// SET：判断各个按钮是否已经设置了数字
var JUDGE = {
	SET:{ 
		A:0, B:0, C:0, D:0, E:0
	},
};

var allSET = 1;
var STOP = 0;
var area = ['A', 'B', 'C', 'D', 'E']; //顺序

window.onload = function() {
	$(".unread").hide();	//隐藏未读信息
	var apbs = $("#control-ring-container"); //因为层叠问题 apb在底层 点击不到	
	apbs[0].addEventListener('click', start);	//点击(apb)事件 自动执行
	var buttonl = $("#button");
	for (var i = 0; i < buttonl.length; i++) 
	buttonl[i].addEventListener('mouseleave', stop);	//鼠标移开进行重置
}

function start(){
	reSet();
	auto(0,0);
	if(STOP==1){
		STOP=0;
	}
}

function auto(i,SUM){
	if(STOP==1){
		reSet();
		return;
	}
	$("."+area[i]+" .unread").show();
	$("."+area[i]+" .unread").html("...");
	JUDGE.SET[i] = 1;
	$(".button:not(." + area[i] +")").css({"background":"gray"}); //点击过程中使得除点击外的按钮变灰
	$.get("127.0.0.1", function(data, status) {
		$("."+area[i]+" .unread").html(data);
		$("."+area[i]).css({"background":"gray"});
		for(var j in JUDGE.SET){
			if(JUDGE.SET[j] == 0){
				$("."+j).css({"background-color":"blue"});
				allSET = 0;
			}
		}
		SUM += parseInt(data);
		if (i != 4 && STOP!=1) 
			auto(i+1, SUM);
		//利用递归，依次取数
		else {
			$(".button").css({"background-color":"gray"});
			$("#info-bar").css({"background-color":"blue"});
			setTimeout(function(){	
				$("#info-bar").css({"background-color":"gray"});	
			},900);			
			setTimeout(function(){	
				$("#sum").html(SUM);	
			},1000);			
		}
	});
}

function reSet() {
	// 将JUDGE重置
	for (var j in JUDGE.SET)
		JUDGE.SET[j] = 0;
	// 将颜色恢复 sum清空 unread隐藏
	$(".button").css({"background-color":"blue"});
	$("#info-bar").css({"background-color":"gray"});
	$("#sum").html("");
	$(".unread").hide();
}

function stop(){
	STOP=1;
	reSet();
}