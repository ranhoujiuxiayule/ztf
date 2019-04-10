require(["require.config"],function(){
    require(["jquery","footer","url","template","header","zoom"],($,footer,url,template)=>{
        footer.init();
        function Detail(){
            this.init().then(()=>{
                this.option();
                this.zoom();
                
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
            option(){
                var _this=this;
                $("#detail-container").on("click",function(event){
                    var target=event.target;
                    var a,b;
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
                        if(_this.a==undefined||_this.b==undefined){
                            $(".tip1").css({"display":"block"});
                        }else{
                        _this.detail.colors=_this.a.html();
                        _this.detail.size=_this.b.html();
                        _this.addshopcar();
                        $(".tip2").css({"display":"block"})
                        $(".bqa2").on("click",function(){
                            $(".tip2").css({"display":"none"})
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
                    shopcar[index].num++;
            }else{
              // 购物车里还没有加过当前数据
              shopcar.push({...this.detail, num : 1});
            }
            localStorage.setItem("shopcar" , JSON.stringify(shopcar));
          }else{
            localStorage.setItem("shopcar", JSON.stringify([
{...this.detail, num : 1}]));
          }
            }
        })
        new Detail();
    })
})