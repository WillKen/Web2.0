// 17343155 张伟焜

$(function(){
	$('input:not(.button)').blur(function(){	//input失去焦点事件：进行判断
		if(check.checkField(this.id, $(this).val())){	//检查Field
			$(this).parent().find('.error').text('').hide();	//如果是合法的，就隐藏error
		}
		else{
			$(this).parent().find('.error').text(check.form[this.id].errormessage).show();	//不合法，显示error
		}
	});

	$('input.button.submit').click(function(){	//submit按钮点击事件：进行判断
		$('input:not(.button)').blur();	//调用blur事件
		if(!check.checkForm()) return false;	//检查Form
	});

	$('input.button.reset').click(function(){	//reset按钮点击事件：清空input 
		document.getElementsByClassName(username).value='';
		document.getElementsByClassName(sid).value='';
		document.getElementsByClassName(phone).value='';
		document.getElementsByClassName(email).value='';
	});
});