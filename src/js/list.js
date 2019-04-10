require(["require.config"],function(){
    require(["jquery","footer","url","template","header"],function($,footer,url,template){
        footer.init();
        
        function list(){
            this.init();
            
        }
        $.extend(list.prototype,{
            init(){
                this.container=$("#list-container");
                this.getdata().then(()=>{
                    this.render(this.data);
                    this.sort();
                });
                
            },
            getdata(){
                return new Promise(resolve => {
                $.get(url.baseUrl+"shop_list",res=>{
                    if(res.res_code===1){
                        this.data=res.res_body.list;
                        resolve();
                    }
                })
            })
            },
            sort(){
                var _this=this;
                $("#sort").on("click",function(event){
                     var target =event.target;
                     let data;
                    if(target.className=="inid"){
                        data=_this.data.sort((a,b)=>{
                            return a.id-b.id;
                        })
                        _this.render(data);
                    }
                    if(target.className=="insalenum"){
                        data=_this.data.sort((a,b)=>{
                            return b.salenum-a.salenum;
                        })
                        _this.render(data);
                    }
                     if(target.className=="ingood"){
                        data=_this.data.sort((a,b)=>{
                            return b.good-a.good;
                        })
                        _this.render(data);
                    }
                     if(target.className=="indate"){
                        data=_this.data.sort((a,b)=>{
                            return b.date-a.date;
                        })
                        _this.render(data);
                    }
                    if(target.className=="inprice"){
                        data=_this.data.sort((a,b)=>{
                            return b.bprice-a.bprice;
                        })
                        _this.render(data);
                    }
                })
            },
            
            render(data){
                this.container.html(template("splist",{list:data}))
            },
        })
        new list();
    })

})