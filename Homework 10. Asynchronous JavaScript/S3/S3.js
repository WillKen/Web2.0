
window.onload = function () {
	$(".unread").hide();	//隐藏未读信息
	var apbs = $("#control-ring-container"); //因为层叠问题 apb在底层 点击不到
	apbs[0].addEventListener('click', auto);
	var buttonl = $("#button");
	for (var i = 0; i < buttonl.length; i++) 
	buttonl[i].addEventListener('mouseleave', reSet);
}

function auto() {
	var SET = { // SET：判断各个按钮是否已经设置了数字
		A:0,
		B:0,
		C:0, 
		D:0, 
		E:0
	};
	for (var s in SET) {
		$("."+s+" .unread").show();
		$("."+s+" .unread").html("...");
		$("."+s).css({"background":"gray"});
		(function (s) {
			$.get("127.0.0.1?time="+Math.random(), function(data, status) {//将时间差定义为任意值
				$("."+s+" .unread").html(data);	//同时显示
				SET[s] = 1;
				if (SET.A == 1 && SET.B == 1 && SET.C == 1 && SET.D == 1 && SET.E == 1) {//所有按钮都有数字则计算
					var sum = 0;
					var nums = $(".unread");
					for (var i = 0; i < nums.length; i++) 
						sum += parseInt(nums[i].innerHTML);
					$("#sum").html(sum);
					$("#info-bar").css({"background-color":"gray"});
					$(".button").css({"background-color":"gray"});
				}
			});
		}) (s);
	}
}

function reSet() {
	$(".unread").hide();
	$("#sum").html("");
	$(".button").css({"background-color":"blue"});
	$("#info-bar").css({"background-color":"gray"});
}