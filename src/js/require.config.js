require.config({
	baseUrl:"/",
	paths:{
		"jquery":"libs/jquery/jquery-1.11.3.min",
		"header":"js/module/header",
		"footer":"js/module/footer",
		"url":"js/module/url",
		"template":"libs/art-template/template-web",
		"shoplist":"js/module/shoplist",
		"Swiper" : "libs/swiper/js/swiper",
		"zoom" :"libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
		"do":"libs/jquery-plugins/jquery.fly.min"
	},
	shim:{
		"zoom":{
			deps:["jquery"]
		},
		"do":{
			deps:["jquery"]
		}
	}
})
