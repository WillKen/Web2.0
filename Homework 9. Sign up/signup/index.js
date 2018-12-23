// 17343155 张伟焜

var http = require('http');
var urlTool =require('url');
var querystring =require('querystring');
var jade=require('jade');
var fs=require('fs');
var check=require('./check');
var users ={}

http.createServer(function(request,response){
	switch(request.url){
		case '/check.js':
			sendFile(response,'check.js','text/javascript');
			break;
		case '/signup.js':
			sendFile(response,'signup.js','text/javascript');
		case '/style.css':
			sendFile(response,'style.css','text/css');
			break;
		default:
			request.method=='POST'? registUser(request,response) : sendHtml(request,response);
	}
}).listen(8000);	//设置端口

console.log("INPUTE: 'localhost:8000' in your browser");

function sendFile(response,filepath,mime){
	response.writeHead(200,{"Content-Type": mime});
	response.end(fs.readFileSync(filepath));
}

function registUser(request,response){	//注册用户
	request.on('data',function(chunk){	//读取数据
		try {
			var user =parseUser(chunk.toString());	//调用函数（按正则表达式，把数据划分开）
			checkUser(user);	//检查数据的合法性	
			users[user.username] =user;
			response.writeHead(301,{Location:'?username='+user.username});
			response.end();
		}
		catch(error){
			//console.warn("register error: ",error);
			showSignup(response,user,error.message);	//有错误或用户已存在，页面不跳转
		}
	});
}

function checkUser(user){	//检查用户数据
	var errorMessages=[];
	for(var key in user){
		if(!check.checkField(key,user[key])) errorMessages.push(check.form[key].errormessage);	//检查数据格式合法性
		if(!check.isAttrValueUnique(users,user,key)) errorMessages.push(	//检查用户是否已经存在
			// "key: "+key +"is not unique by value: " + user[key]
			key+": "+user[key]+" is already exist!"
		);
	}
	if (errorMessages.length >0) throw new Error(errorMessages.join('<br />'));	//throw error
}

function parseUser(message){	//按正则表达式，把数据划分开
	params=message.match(/username=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);
	var user={username:params[1],sid: params[2],phone: params[3],email: decodeURIComponent(params[4])}	//decodeURIComponent(params[4])保证 @ 可以正常显示
	//console.log('user parsed is: ',user);
	return user;
}

function sendHtml(request,response){	//发送页面
	var username = parseUsername(request);
	if(!username || !isRegistedUser(username)){	//有错或用户未注册，显示注册页面（signup.html)
		showSignup(response, {username:null},null);
	}
	else{
		showInfo(response,users[username]);	//用户已注册，显示用户信息（information.html)
	}
}

function parseUsername(request){	//读取用户名
	return querystring.parse(urlTool.parse(request.url).query).username;
}

function isRegistedUser(username){	//用户已注册
	return !!users[username];
}

function showSignup(response,user,error){	//显示signup页面
	showHtml(response,'signup.jade',{user: user, error: error});
}

function showInfo(response,user){	//显示用户信息页面
	showHtml(response,'information.jade',user);
}

function showHtml(response, template, data){	//显示网页
	response.writeHead(200,{"Content-Type": "text/html"});
	response.end(jade.renderFile(template,data))
}