define(["jquery"],function($){
	class Header{
		constructor(){
			this.init().then(()=>{
				this.searchinput=$("#searchinput");
				this.text_result=$("#text-result");
				this.shopnb();
				this.getdata_user();
				this.search();
			});
		}
		init(){
			return new Promise((resolve, reject)=>{
			$("header").load("/html/module/header.html",function(){
				resolve();
			})
			
		})
		}
		search () {
			let _this = this;
			this.searchinput.on("keyup", function () {
				let keyWord = $(this).val().trim();
				// 内容不为空才请求
				if(keyWord !== ""){
					// getJSON可以完成jsonp跨域，数据返回了自动调用后面的回调
					$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyWord, res => {
						let list = res.s;
						console.log(list);
						let ul = $("<ul>");
						list.forEach( function(item, index) {
							$("<li>").html(item).appendTo(ul);
						});
						_this.text_result.empty().show().append(ul);
					})
				}else{
					// 把上一次请求渲染出来的container隐藏
					_this.text_result.hide();
				}

				
			})

			this.searchinput.on("blur", function () {
				setTimeout(() => {
					_this.text_result.hide();
				},200);
				
			})

			this.text_result.on("click", "li", function (e) {
				_this.searchinput.val($(this).html());
				_this.text_result.hide();
			})
		}
		shopnb(){
			var shopcar=localStorage.getItem("shopcar");
			if(shopcar){
				var numb=0;
				shopcar = JSON.parse(shopcar);
				// console.log(shopcar);
				shopcar.forEach(element => {
					numb=numb+element.num;
					
				});
				$("#shopnb").html(numb)
			}
			
		}
		getdata_user(){
			var _this=this;
			let user=localStorage.getItem("user");
			new Promise((resolve, reject)=>{
			if(user){
				user=JSON.parse(user);
				$("#welcom").html(user);
				$("#lort").hide();
				$("#lort1").show();
				$("#others").html("更换用户");
				_this.go();
			}
		})
		}
		go(){
			var _this=this;
			$("#lort1").on("click",function(){
				localStorage.removeItem('user');
				_this.init()
			})
			$("#others").on("click",function(){
				location.href="/html/login.html"
			})
		}
	}
	return new Header();
})
