// JUDGE用来判断状态:
// SET：判断各个按钮是否已经设置了数字
// PROCESSING： 判断是否有按钮正在执行操作
var JUDGE = {
	SET:{ 
		A:0, B:0, C:0, D:0, E:0
	},
	PROCESSING: 0
};

window.onload = function() {
	$(".unread").hide();	//隐藏未读信息
	var buttons = $(".button");
	for (var i = 0; i < buttons.length; i++) 
		buttons[i].addEventListener('click', getNum);	//点击事件 获取数字
	var infos = $("#info-bar");
	for (var i = 0; i < infos.length; i++) 
		infos[i].addEventListener('click', getSum);		//点击事件 获取数字之和	
	var buttonl = $("#button");
	for (var i = 0; i < buttonl.length; i++) 
		buttonl[i].addEventListener('mouseleave', reSet);		//鼠标移开进行重置
}

function getNum(){
	var obj = event.target.className.split(" ")[0];//split函数根据某个字符串进行拆分成数组
 	var allSET = 1;	//判断是否A~E都获得了数字

	if (JUDGE.SET[obj] == 1) //该按钮已经获得了数字
		return;
	if (JUDGE.PROCESSING == 1) //有按钮正在处理
		return;

	JUDGE.PROCESSING = 1;
	$(".button:not(."+obj+")").css({"background":"gray"}); //除了目标按钮以外其他按钮为灰色
	$("."+obj+" .unread").show();//按钮的子元素span
	$("."+obj+" .unread").html("...");

	$.get("127.0.0.1", function (data,status) { //使用 HTTP GET 请求从服务器加载数据
		$("."+obj+" .unread").html(data); //显示传入的随机数
		JUDGE.SET[obj] = 1;	//设置状态
		$("."+obj).css({"background-color":"gray"});//已经显示过的按钮变灰
		for (var j in JUDGE.SET) {
			if (JUDGE.SET[j] == 0) {	//没获得数字的变回蓝色
				$("."+j).css({"background-color":"blue"});
				allSET = 0;//用于判断是否还有没有获得数字的按钮
			}
		}
		if (allSET == 1){  //所有数字都获得了按钮
			$("#info-bar").css({"background-color":"blue"});
		}
		JUDGE.PROCESSING = 0;
	});
}

function getSum() {
	for (var j in JUDGE.SET) {
		if (JUDGE.SET[j] == 0) //如果有按钮没获得数字 返回
			return;
	}
	var sum = 0;
	var nums = $(".unread");
	for (var i = 0; i < 5; i++) 
		sum += parseInt(nums[i].innerHTML);
	$("#sum").html(sum);
	$("#info-bar").css({"background-color":"gray"});
}

function reSet() {
	// 将JUDGE重置
	for (var j in JUDGE.SET)
		JUDGE.SET[j] = 0;
	JUDGE.PROCESSING = 0;
	// 将颜色恢复 sum清空 unread隐藏
	$(".button").css({"background-color":"blue"});
	$("#info-bar").css({"background-color":"gray"});
	$("#sum").html("");
	$(".unread").hide();
}