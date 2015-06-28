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
	
	function calcSidebar(){//用户名布局默认在最左下角，小于640在右上角
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

//操作提示(1成功/2失败/3加载)
var Tips = function(){
	this.option = {type:1,html:""};
	this.timer;
	this.init();
};
Tips.prototype = {
	constructor: Tips,
	ismsgbox: function(){
		if($("#msgboxdiv").length == 1){
			if(this.option.type != 1){
				clearTimeout(this.timer);
			}
			this.hidemsgbox();
		}
	},
	hidemsgbox: function(){
		$("#msgboxdiv").remove();
	},
	timedCount: function(){
		var that = this;
		clearTimeout(this.timer);
		this.timer = setTimeout(function(){
			that.hidemsgbox();
		}, 1000);
	},
	printhtml: function(){
		var option = arguments[0];
		var msgboxdiv = document.createElement('div');
		msgboxdiv.className = 'msgboxdiv';
		msgboxdiv.id = 'msgboxdiv';
			
		if(this.option.type == 1){
			var msg = document.createElement('span');
			msg.className = 'msg';
			msg.innerHTML = '操作成功';
			if(typeof this.option.html == "string"){
				msg.innerHTML = this.option.html;
			}
			
			msgboxdiv.appendChild(msg);
			this.timedCount();
			
		}else if(this.option.type == 2){
			var fragment = document.createDocumentFragment(),//创建碎片文档,提高append效率
			errmsg = document.createElement('span'),
			btn_close_errmsg = document.createElement('i'),
			tempdiv;
			
			errmsg.className = 'errmsg';
			errmsg.innerHTML = '<div class="errmsg_title">操作失败</div>';
			btn_close_errmsg.className = 'close';
			btn_close_errmsg.id = 'btn_close_errmsg';
			btn_close_errmsg.innerHTML = '[关闭]';
			
			fragment.appendChild(btn_close_errmsg);
			
			if(typeof this.option.html == "string"){
				tempdiv = document.createElement('tempdiv');
				tempdiv.innerHTML = this.option.html,
				tempdiv = tempdiv.childNodes;
				
				function mergeArr( first, second ) {
					var len =+ second.length,
						j = 0,
						i = first.length;
					for (; j<len; j++){
						first[i++] = second[j];
					}
					first.length = i;
					return first;
				}
				tempdiv = mergeArr([],tempdiv);//转为普通数组，因为NodeList会动态减少
				for(var i=0; i<tempdiv.length; i++){
					fragment.appendChild(tempdiv[i]);
				}
			}
			errmsg.appendChild(fragment);
			msgboxdiv.appendChild(errmsg);
		}
		
		this.ismsgbox(); 
		$("body").append(msgboxdiv);
	},
	errmsg: function(){
		this.option.type = 2;
		this.option.html = arguments[0];
		this.printhtml();
	},
	msg: function(){
		this.option.type = 1;
		this.option.html = arguments[0];
		this.printhtml();
	},
	events: function(){
		var that = this;
		$("body").on("click", "#btn_close_errmsg", function(){
			that.hidemsgbox();
		});
	},
	init: function(){
		this.events();
	}
};