require(["require.config"],function(){
    require(["jquery","footer","url","template","header","do","zoom"],($,footer,url,template,header)=>{
        footer.init();
        function Detail(){
            this.init().then(()=>{
                this.option();
                this.zoom();
                this.ronum();
                this.shopnum();
            })
           
        }
        $.extend(Detail.prototype,{
            init(){
                return new Promise((resolve, reject)=>{
                let id=location.search.slice(4);
                $.ajax({
                    url:url.baseUrl+"detail?id="+id,
                    method:"GET",
                    dataType:"json",
                    success:res=>{
                        if(res.res_code===1){
                            this.detail=res.res_body.data.detail;
                            this.detail.id=id;
                            this.render(res.res_body.data);
                            resolve();
                        }
                    }
                })
               
            })
            },
            render(data){
                var html=template("temdetail",{...data.detail});
                $("#detail-container").html(html);
            },
            zoom(){
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                });
            },
            fly(){
                
            },
            option(){
                var _this=this;
                $("#detail-container").on("click",function(event){
                    var target=event.target;
                    var a,b,c;
                    switch(target.className){
                        case "color1":$(target).css("background","red");
                        $(target).siblings().css("background","white");
                        $("#shopchose").html(($(target).html()));
                        $(".tip1").css({"display":"none"});
                        _this.a;
                        return _this.a = $(target);
                        case "size1":
                        $(target).css("background","red");$(target).siblings().css("background","white");
                        $(".tip1").css({"display":"none"});
                        _this.b;
                        return  _this.b = $(target);
                        case "addshopcar":
                        if(_this.a==undefined||_this.b==undefined||_this.c<=0){
                            if(_this.c<=0){
                                $(".tip3").show();
                            }
                            if(_this.a==undefined||_this.b==undefined){
                                $(".tip1").show();
                            }   
                        }else{
                        _this.detail.colors=_this.a.html();
                        _this.detail.size=_this.b.html();
                        console.log(_this.c)
                        _this.detail.num= Number(_this.c);
                        _this.addshopcar();
                        header.shopnb();
                        $(".tip2").hide();
                        $(".bqa2").on("click",function(){
                            $(".tip2").hide()
                        })
                        };
                    }
                })
            },
            addshopcar(){
        let shopcar = localStorage.getItem("shopcar");
          if(shopcar) {
            shopcar = JSON.parse(shopcar);
            // 购物车已经有数据
            // 判断购物车里是否已经存在当前数据
            let index;
            if(shopcar.some((item, i) => {
              index = i;
              return item.id == this.detail.id&&item.size==this.detail.size&&item.colors==this.detail.colors;
            })){
                    shopcar[index].num=shopcar[index].num+Number(this.c);
                   
            }else{
              // 购物车里还没有加过当前数据
              shopcar.push({...this.detail});
            }
            localStorage.setItem("shopcar" , JSON.stringify(shopcar));
          }else{
            localStorage.setItem("shopcar", JSON.stringify([{...this.detail}]));
          }
          $(`<div style="width: 40px;height: 40px;background-color: #b81c22;"><div>`).fly({
            start:{
              left: event.clientX,  //开始位置（必填）#fly元素会被设置成position: fixed
              top: event.clientY,  //开始位置（必填）
            },
            end:{
              left: $(window).innerWidth()-200, //结束位置（必填）
              top: $("#shopcar").position().top  //结束位置（必填）
            },
            autoPlay: true, //是否直接运动,默认true
            speed: 1.1, //越大越快，默认1.2
            vertex_Rtop:100, //运动轨迹最高点top值，默认20
            onEnd: function(){
                this.destroy();
            } //结束回调
          });
            },
            ronum(){
                var _this=this;
                if(this.detail.ronum==0){
                    $("#ronum").html("所选商品无货")
                }else if(this.detail.ronum>100){
                    $("#ronum").html("现在有货")
                }
                else{
                    $("#ronum").html("库存极少")
                }
            },
            shopnum(){
                var _this=this;
                _this.c=1;
                $(".addshop_num").on("blur",function(){
                    _this.c = $(".addshop_num").val();
                    console.log(_this.c);
                    $(".tip3").hide();
        
                })
            }
        })
        new Detail();
    })
})