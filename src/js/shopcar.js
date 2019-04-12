require(["require.config"],function(){
    require(["jquery","footer","template"],function($,footer,template){
        footer.foot2();
        function Shopcar(){
            this.init();
            this.user_data();
            this.goshop();
        }
        $.extend(Shopcar.prototype,{
            init(){
                this.container=$("#shopcar_container");
                this.n=0;
                this.data=JSON.parse(localStorage.getItem("shopcar"));
                this.data.forEach(item => {
                    item.hprice=item.num*item.price;
                    // item.push(nprice:item.num*item.price)
                });
                this.render(this.data);
                
            },
            user_data(){
                var _this=this;
                var user=localStorage.getItem("user");
                new Promise((resolve, reject)=>{
                if(user){
                    user=JSON.parse(user);
                    $("#user_name").html(user);
                    $("#register").hide();
                    $("#clearuser").show();
                    _this.clear();
                    $("#islogin").html("切换用户");
                }
                else{
                    $("#user_name").html("欢迎光临凡客诚品");
                    $("#register").show();
                    $("#clearuser").hide();
                    $("#islogin").html("登录");
                }
            })
            },
            render(data){
                new Promise((resolve, reject)=>{
                this.container.html(template("shopcar_box",{list:data}));
                this.totalprice();
                this.add();
                this.check();
            })
            },
            add(){
                var _this=this;
                this.container.on("click",function(event){
                    var target=event.target;
                    if(target.className=="add"){
                        $(target).next().val(Number($(target).next().val())+1);
                        let cprice=$(target).parent().prev().children().html(),
                            cnum=$(target).next().val();
                        let hprice = _this.hprice(cprice,cnum);
                        $(target).parent().next().next().children().html(hprice);
    
                        _this.totalprice();
                    }
                    if(target.className=="down"){
                        
                        $(target).prev().val(Number($(target).prev().val())-1);
                        if(Number($(target).prev().val()<=0)){
                            alert("数量不能小于0哦");
                            Number($(target).prev().val(1));
                            
                        }
                        let cprice=$(target).parent().prev().children().html(),
                            cnum=$(target).prev().val();
                        let hprice = _this.hprice(cprice,cnum);
                        console.log(cprice,cnum)
                        console.log(1234567890)
                        $(target).parent().next().next().children().html(hprice);
    
                        _this.totalprice();
                    }
                    if(target.className=="delbtn"){
                        
                        var index;
                         _this.data.some((item,i) => {
                                index=i
                                 return _this.data[i].id==$(target).parent().parent().attr("data-id")&&_this.data[i].colors==$(target).parent().prev().prev().prev().prev().prev().prev().children(".colors").html()&&_this.data[i].size==$(target).parent().prev().prev().prev().prev().prev().html();
                        });
                    
                    //    _this.data[index].splice(1);
                       _this.data.splice(index,1);
                       _this.render(_this.data);
                       localStorage.setItem("shopcar" , JSON.stringify(_this.data));
                       
                    }
                    if(target.className=="t_num"){
                        $(".t_num").on("blur",function(){
                        let cprice=$(target).parent().prev().children().html(),
                            cnum=$(target).val();
                        let hprice = _this.hprice(cprice,cnum);
                        $(target).parent().next().next().children().html(hprice);
                        _this.totalprice();
                        })
                    }
                })
            },
            hprice(cprice,cnum){
                    let  hprice=cprice*cnum;
                    return hprice;
            },
            // tnum(){
            //     var j=0,t_num=0;
            //     $(".t_num").each(function(index,i){
            //        j=Number(i.value)
            //        t_num=t_num+j
                  
            //     })
            //     $("#tnumber").html(t_num)
            //     // console.log($(".t_num").each())
            // },
            check(){
                var _this=this;
                $(".allcheck").on("change",function(){
                    $(".acheck").prop("checked",this.checked);
                    _this.totalprice();
                    _this.n=$(".acheck").length;
                })
                $(".acheck").each(function(index,i){
                    console.log(i)
                    i.onchange=function(){
                        
                        _this.n+=i.checked?1:-1;
                        // console.log($(".allcheck").prop("checked",true))
                       if(_this.n === $(".acheck").length){
                        $(".allcheck").prop("checked",true) 
                        }else{
                            $(".allcheck").prop("checked",false)
                        }
                        _this.totalprice();
                    }
                })
                
            },
            totalprice(){
                var toprice,toprice1=0,tnumber,tnumber1=0;
                $(".acheck").each(function(index,i){
                    if(i.checked){
                        toprice=Number(i.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0].innerHTML);
                        tnumber=Number(i.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[1].value);
                        toprice1=toprice1+toprice;
                        tnumber1=tnumber1+tnumber;
                        console.log(tnumber1);
                    }
                    
                })
                $("#totalprice").html(toprice1);
                $("#tnumber").html(tnumber1);
            },
            goshop(){
                $("#goshop").on("click",function(){
                    location.href="/html/list.html"
                })
            },
            clear(){
                var _this=this;
                $("#clearuser").on("click",function(){
                    localStorage.removeItem("user");
                    _this.user_data()
                })

            }

        })
        new Shopcar();
    })
})