require(["require.config"],function(){
	require(["jquery","footer"],function($,footer){
		footer.foot2();
		function Fn(){
			this.init().then(()=>{
				this.checkbox()
			})
		}
		$.extend(Fn.prototype,{
			init(){
				return new Promise((resolve, reject)=>{
				this.dorandchar();
				resolve();
			})
			},
			dorandchar(){
				function randomChar(){
					var arr = new Array(3);
					arr[0] = String.fromCharCode(Math.floor(Math.random()*10+48));
					arr[1] = String.fromCharCode(Math.floor(Math.random()*26+97));
					arr[2] = String.fromCharCode(Math.floor(Math.random()*26+65));
					return arr[Math.floor(Math.random()*arr.length)];
				}
				
				var str = "";
				for(var i = 0; i < 4; i++){
					str += randomChar();
				}
				this.str=str;
				$(".yzm").html(str);
				$(".yzm").on("click",()=>{
					this.dorandchar();
				})
			},
			checkbox(){
				var _this=this;
				$("#ydfk").on("change",function(){
					if($("#ydfk").prop("checked")==true){
						new Promise((resolve, reject)=>{
						$("#nowreg").css({background:"#b52024"})
							_this.option();
					})

					}else{
						$("#nowreg").css({background:"#9a9a9a"})
					}
				})
			},
			option(){
				var _this=this;
				$("#nowreg").on("click",function(){
				if($("#yzminput").val()!=_this.str||$("#passw1").val()!=$("#passw2").val()){
					if($("#yzminput").val()!=_this.str){
						$("#yzminput").val("验证码错误！")
						_this.dorandchar();
					}
					if($("#passw1").val()!=$("#passw2").val()){
						$("#stip").html("输入密码不一致！")
						_this.dorandchar();
					}
				}else{
					if(confirm("跳转登录页面？")){
						location.href="/html/login.html"
					}
				}
				})
				
			}
		})
		new Fn()
	})
})
