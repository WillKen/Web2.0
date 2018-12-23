// 17343155 张伟焜

var check={
	form:{
		username:{
			status: false,
			errormessage:'6~18位英文字母，数字或下划线，必须以英文字母开头'
		},
		sid:{
			status: false,
			errormessage:'8位数字，不能以0开头'
		},
		phone:{
			status: false,
			errormessage:'11位数字，不能以0开头'
		},
		email:{
			status:false,
			errormessage:'邮箱地址格式错误'
		}
	},

	checkUsername: function(username){
		return this.form.username.status=/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(username);
	},

	checkSid: function(sid){
		return this.form.sid.status=/^[1-9]\d{7}$/.test(sid);
	},

	checkPhone: function(phone){
		return this.form.phone.status=/^[1-9]\d{10}$/.test(phone);
	},

	checkEmail: function(email){
		return this.form.email.status=/^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
	},

	checkField: function(fieldname,value){//fieldname是否合法
		var CapFieldname=fieldname[0].toUpperCase() + fieldname.slice(1,fieldname.length);
		return this["check"+CapFieldname](value);
	},

	checkForm: function(){	//表单中的每一项都为true，form才为true
		return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status;
	},

	getErrorMessage: function(fieldname){	//返回错误信息
		 return this.form[fieldname].errormessage;
	},
	
	isAttrValueUnique: function(registry,user,attr){	//判断信息是否唯一
		for(var key in registry){
			if(registry.hasOwnProperty(key) && registry[key][attr]==user[attr]) return false;
		}
		return true;
	}
}

if(typeof module == 'object'){ //允许check在客户端和服务端的调用
	module.exports=check;
}