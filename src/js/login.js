require(["require.config"],function(){
    require(["jquery","footer"],function($,footer){
        footer.foot2();
        function Login(){
            this.init();
        }
        $.extend(Login.prototype,{
            init(){
                this.change();
                this.option();
                this.dorandchar();
            },
            change(){
                $("#ftlog").on("click",function(){
                    $(".form2").show();
                    $(".ftlog").css({"background":"#b52024"});
                    $("#ftlog").css({"color":"white","font-size":"23px"})
                    $(".form1").hide();
                    $(".ptlog").css({"background":"white"});
                    $("#ptlog").css({"color":"black","font-size":"20px"})
                })
                $("#ptlog").on("click",function(){
                    $(".form1").show();
                    $(".ptlog").css({"background":"#b52024"});
                    $("#ptlog").css({"color":"white","font-size":"23px"})
                    $(".form2").hide();
                    $(".ftlog").css({"background":"white"});
                    $("#ftlog").css({"color":"black","font-size":"20px"})
                })
            },
            option(){
                var _this=this;
                $(".r3").on("click",function(event){
                    var target=event.target;
                    if(target.className=="login1"){
                        console.log($.trim($("#userinput").val()))
                        if($.trim($("#userinput").val())==""||$.trim($("#pswinput").val())==""||$("#userinput").val()=="用户名不正确"||$("#userinput").val()=="密码不正确"){
                            if($("#userinput").val()==""){
                                $("#userinput").val("用户名不正确")
                            }
                            if($("#pswinput").val()==""){
                                $("#userinput").val("密码不正确")
                            }
                        }else{
                            let user=$.trim($("#userinput").val());
                            localStorage.setItem("user" , JSON.stringify(user));
                            location.href="/index.html";
                        }
                       
                    }
                    else if(target.className=="login2"){
                        if(_this.isphonenum($("#usernum").val())==true&&$("#yzmnum").val()==_this.str){
                            let user=$.trim($("#usernum").val());
                            localStorage.setItem("user" , JSON.stringify(user));
                            location.href="/index.html";
                        }else {
                            if(_this.isphonenum($("#usernum").val())==false){
                                console.log($("#usernum").val());
                                $("#usernum").val("请输入正确格式的手机号码！")
                                
                            }
                            if($("#yzmnum").val()!=_this.str){
                                $("#yzmnum").val("验证码错误！")
                                _this.dorandchar();
                            }

                        }

                    }
                    
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
				$("#cfyzm").html(str);
				$("#nextyzm").on("click",()=>{
					this.dorandchar();
				})
            },
            //正恒判断是否为1开头的11位数字
            isphonenum(a){
                var myreg=/^[1][0-9]{10}$/;
                if (!myreg.test(a)) {
                    return false;
                } else {
                    return true;
                }
            }
        })
        new Login();
    })

})