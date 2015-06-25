// JavaScript Document


$(function(){
	var browser = (function(){
		var isIE6 = /msie 6/i.test(navigator.userAgent),
		isIE7 = /msie 7/i.test(navigator.userAgent),
		isIE8 = /msie 8/i.test(navigator.userAgent),
		isIE = /msie/i.test(navigator.userAgent);
		return {
			msie:isIE,
			version:function(){
				switch(true){
					case isIE6:return 6;
					case isIE7:return 7;
					case isIE8:return 8;
				}
			}()
		};
	})();
	
	function calcSidebar(){//用来用户名布局默认在最左下角，小于640在右上角
		var $sidebar = $("#sidebar"),
		$main = $("#main"),
		sidebarH = $sidebar.height(),
		mainH = $main.outerHeight(true),
		winW = $(window).width(),
		winH = $(window).height();
		
		if(winW <= 640 && browser.version != 6 && browser.version != 7 && browser.version != 8){
			$sidebar.height("auto");
			return;
		}
		if(mainH < winH){
			$sidebar.height(winH);
		}else{
			$sidebar.height(mainH);
		}
	}
	
	calcSidebar();
	
	$(window).resize(function(){
		calcSidebar();
	});
	
	$("#toggler_menu").click(function(){
		$("#sidebar_menu").toggle("slow");
	});
	
});