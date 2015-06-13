// JavaScript Document


$(function(){
	function calcSidebar(){//用来控制登陆的布局始终在最左下角
		var $sidebar = $("#sidebar"),
		$main = $("#main"),
		sidebarH = $sidebar.height(),
		mainH = $main.outerHeight(true),
		docW = $(document).width(),
		winH = $(window).height();
		
		if(docW <= 640){
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