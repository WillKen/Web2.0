// 17343155 张伟焜








//说明：
	// 我的计算也是使用了eval()函数；
	// 之所以代码这么长，是因为我想把可能出现的错误都想出来，让它针对不同的错误进行有针对的报错：
	// 比如没有左操作数，没有有操作数，括号个数不一致等等
	// 最后实现eval 还加入了try 和catch 的异常处理 把我没有考虑到的bug 进行alert







var formula = "";
var answer = "";

window.onload = function() {
	// 读取数字		
	document.getElementById("number0").onclick = function(){
		//上一次计算完成后，重新按一个数字，则进行初始化
		ini();
		formula += "0";
		display();
	}
	document.getElementById("number1").onclick = function(){
		ini();
		formula += "1";
		display();
	}
	document.getElementById("number2").onclick = function(){
		ini();
		formula += "2";
		display();
	}	
	document.getElementById("number3").onclick = function(){
		ini();
		formula += "3";
		display();
	}
	document.getElementById("number4").onclick = function(){
		ini();
		formula += "4";
		display();
	}
	document.getElementById("number5").onclick = function(){
		ini();
		formula += "5";
		display();
	}
	document.getElementById("number6").onclick = function(){
		ini();
		formula += "6";
		display();
	}
	document.getElementById("number7").onclick = function(){
		ini();
		formula += "7";
		display();
	}
	document.getElementById("number8").onclick = function(){
		ini();
		formula += "8";
		display();
	}
	document.getElementById("number9").onclick = function(){
		ini();
		formula += "9";
		display();
	}
	//读取字符 其中 reuse判断是否将上个answer作为新的左操作数，其函数定义在最后。
	document.getElementById("plus").onclick = function(){
		reuse();
		formula += "+";
		display();
	}
	document.getElementById("minus").onclick = function(){
		reuse();		
		formula += "-";
		display();
	}
	document.getElementById("mulitiply").onclick = function(){
		reuse();
		formula += "*";
		display();
	}
	document.getElementById("divide").onclick = function(){
		reuse();
		formula += "/";
		display();
	}
	document.getElementById("leftbracket").onclick = function(){
		formula += "(";
		display();
	}
	document.getElementById("rightbracket").onclick = function(){
		formula += ")";
		display();
	}
	document.getElementById("decimal").onclick = function(){
		formula += ".";
		display();
	}
	//CE
	document.getElementById("clear").onclick = function(){
		erase();
	}
	//撤回
	document.getElementById("back").onclick = function(){
		formula = formula.substring(0,formula.length-1);
		display();	
	}
	//开始运算
	document.getElementById("equal").onclick = function(){




//说明：
	// 我的计算也是使用了eval()函数；
	// 之所以代码这么长，是因为我想把可能出现的错误都想出来，让它针对不同的错误进行有针对的报错：
	// 比如没有左操作数，没有有操作数，括号个数不一致等等
	// 最后实现eval 还加入了try 和catch 的异常处理 把我没有考虑到的bug 进行alert







		//非法操作:
		//没有输入左操作数,允许开头出现 “-”
		if(formula[0] == '+' || formula[0] == '*' || formula[0] == '/'){
			alert("You should input a left operand!");
			erase();				
			return;
		}
		//没有输入右操作数
		if(formula[formula.length-1] == '+' || formula[formula.length-1] == '-' || formula[formula.length-1] == '*' || formula[formula.length-1] == '/'){
			alert("You should input a right operand!");
			erase();			
			return;
		}
		//左右括号不匹配数目不匹配
		var left_bracket = 0;
		var right_bracket = 0;
		for(var c = 0; c < formula.length; c++){
			if(formula[c] == '(') left_bracket++;
			if(formula[c] == ')') right_bracket++;
		}
		if(left_bracket != right_bracket){
			alert("The left-bracket(s) didn't suit the right-bracket(s)!");
			erase();			
			return;
		}
		//输入空括号
		for(var c = 0; c < formula.length-1;c++){
			if(formula[c] == '('){
				if(formula[c+1] == ')'){
					alert("There is an empty bracket");
					erase();						
					return;
				}
			}
		}
		//除开头就有括号，否则每个括号前必须有操作数。
		for(var c = 1; c < formula.length;c++){
			if(formula[c] == '('){
				if(formula[c-1] != '+' && formula[c-1] != '-' && formula[c-1] != '*' && formula[c-1] != '/' && formula[c-1] != '('){
					alert("There should be an operator before (");
					erase();					
					return;
				}
			}
		}
		//连续输入两个或以上的运算符号
		for(var counter = 0; counter < formula.length-1;counter++){
			if(formula[counter] == '+' || formula[counter] == '-' || formula[counter] == '*' || formula[counter] == '/'){
				if(formula[counter+1] == '+' || formula[counter+1] == '-' || formula[counter+1] == '*' || formula[counter+1] == '/'){
					alert("Wrong input! You shouldn't input more than 1 operator at one time!");
					erase();						
					return;
				}			
			}
		}
		//拒绝输入的第一位是0XX之类的操作数,防止进行八进制数运算，但允许0.X
		if(formula[0] == '0'&& formula[1]!='.'){
			alert("The left most position can't be 0, except for decimal!");
			erase();					
			return;			
		}
		for(var c = 1; c < formula.length;c++){
			if(formula[c]=='0'){
				if(formula[c-1]=='+'||formula[c-1]=='-'||formula[c-1]=='*'||formula[c-1]=='/'){
					if(formula[c+1]!='.'){
						alert("The left most position can't be 0, except for decimal!");
						erase();					
						return;
					}
				}
			}
		}
		//按等号开始计算。
		//没有任何输入直接按“=”
		if(formula == ""){ 
			alert("There is no input!");
		}
		else{
			//计算公式并赋值给answer
			try{
				eval("answer = "+ formula);
				answer =answer.toFixed(3);
				document.getElementById("input").value = formula;
				document.getElementById("output").value = answer;
			}
			catch(err){
				alert("Something unexpected. Check your input!!");
			}
			
		}		
	}											
}

//若output有值，想继续运算的时候，把之前的output作为左操作数
function reuse(){ 
	if(answer != ""){
		formula = answer;
		answer="";
		document.getElementById("output").value = answer;
	}
}
//上一次计算完成后，重新按一个数字，则进行初始化
function ini(){
	if(answer != ""){
		formula="";
		answer="";
		document.getElementById("output").value = answer;
	}
	if(formula.length>25){
		alert("The operand is so large!");
	}
}
//在输入过程中，将公式显示出来，output栏清空
function display(){
	document.getElementById("input").value = formula;
	answer="";
	document.getElementById("output").value = answer;
}
//清空
function erase(){
	formula = "";
	answer = "";
	document.getElementById("input").value = "0";
	document.getElementById("output").value = "";
}