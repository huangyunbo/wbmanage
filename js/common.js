// JavaScript Document


$(function(){
	function calcSidebar(){//用来控制登陆的布局始终在最左下角
		var $sidebar = $("#sidebar"),
		$main = $("#main"),
		sidebarH = $sidebar.height(),
		mainH = $main.height(),
		bodyH = $(window).height();
		
		if(mainH < bodyH){
			$sidebar.height(bodyH);
		}else{
			$sidebar.height(mainH);
		}
	}
	
	calcSidebar();
	
	$(window).resize(function(){
		calcSidebar();
	});
});