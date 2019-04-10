define(["jquery"],function($){
	class Header{
		constructor(){
			this.init().then(()=>{
				this.shopnb();
			});
		}
		init(){
			return new Promise((resolve, reject)=>{
			$("header").load("/html/module/header.html",function(){
				resolve();
			})
			
		})
		}
		shopnb(){
			var shopcar=localStorage.getItem("shopcar");
			if(shopcar){
				shopcar = JSON.parse(shopcar);
				console.log(shopcar.length);
				$("#shopnb").html(shopcar.length)
			}
			
		}
	}
	return new Header();
})
