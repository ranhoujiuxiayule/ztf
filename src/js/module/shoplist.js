define(["jquery","template"],($,template)=>{
    function Shoplist(container,url,listdata){
        this.container=container;
        this.url=url;
        this.listdata=listdata;
        this.load();
    }
    $.extend(Shoplist.prototype,{
        load:function(){
            this.container.load("/html/module/shoplist.html",()=>{
                if(this.listdata){
                    this.render(this.listdata);
                }
                else{
                    this.getdata()
;                }
            })
        },
        getdata:function(){
            $.get(this.url,res=>{
                if(res.res_code===1){
                    this.render(res.res_body.list);
                }
            })
        },
        render:function(data){
            this.container.html(template("shoplist",{list:data}))
        }

    })
    return Shoplist;
})