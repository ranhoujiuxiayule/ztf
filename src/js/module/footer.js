define(["jquery"],function($){
	class footer{
		constructor(){
			
		}
		init(){
			$("footer").load("/html/module/footer.html",function(){
				
			})
		}
		foot2(){
			$("footer").load("/html/module/footer.html .foot2",function(){
				
			})
		}
	}
	return new footer();
})
