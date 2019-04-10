require(["require.config"],function(){
	require(["jquery","footer","url","template","shoplist","Swiper","header"],function($,footer,url,template,Shoplist,Swiper){
		footer.init();
		class Index{
			constructor(){
				this.searchinput=$("#searchinput");
				this.text_result=$("#text-result");
				this.index_list();
				this.swiper();
			}
			index_list(){
				new Shoplist($("#index-list"),url.baseUrl+"index_list");
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
			swiper(){
				$(document).ready(function () {
					var mySwiper = new Swiper ('.swiper-container', {
						loop: true, // 循环模式选项
						speed:1000,
						autoplay: {
							delay: 2000,
							disableOnInteraction: true,
						},
						
						// 如果需要分页器
						pagination:{
							el: '.swiper-pagination',
							clickable: true,
							clickableClass : 'my-pagination-clickable',
						  },
						
						// 如果需要前进后退按钮
						navigation: {
						  nextEl: '.swiper-button-next',
						  prevEl: '.swiper-button-prev',
						},
					  })
					  mySwiper.el.onmouseenter = function(){
						mySwiper.autoplay.stop();
					  }
					  mySwiper.el.onmouseleave = function(){
						mySwiper.autoplay.start();
					  }
				   })

				  
			}
			
		}
		new Index;
	})
})
