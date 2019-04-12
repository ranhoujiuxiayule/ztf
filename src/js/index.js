require(["require.config"],function(){
	require(["jquery","footer","url","template","shoplist","Swiper","header"],function($,footer,url,template,Shoplist,Swiper){
		footer.init();
		class Index{
			constructor(){
				this.index_list();
				this.swiper();
				this.gotop();
			}
			index_list(){
				new Shoplist($("#index-list"),url.baseUrl+"index_list");
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
			gotop(){
				$("#gotop").on("click",function(){
					$('body,html').animate({scrollTop:0},500);
				})
			}
		}
		new Index;
	})
})
