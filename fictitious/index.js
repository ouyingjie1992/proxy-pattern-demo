/**
 * Created by ouyj on 2018/08/07.
 * 虚拟代理
 */
(function() {
    'use strict';
    // 请求数据-实现即时查询
    var initPost = function() {
		var $showPost = $('#showPost');
		var $postValue = $('#postValue');

		// 本体，发送请求
		var ajaxPost = (function(){
		    return {
		    	sendPost: function(value){
					var html = '';
					html += '<p>';
					html += '请求接口...参数为value=' + value;
					html += '</p>';
				    $showPost.prepend(html);
			    }
		    };
		})();
		// 代理层
		var proxyPost = (function(){
		    var cache = '', 
		        timer;
		    return {
		    	sendPost: function(value){
			        if(!timer){
			            timer = setTimeout(function(){
			                ajaxPost.sendPost(cache); //发送合并后的数据
			                cache = ''; //清空缓存
			                clearTimeout(timer); //清除定时器
			                timer = null;
			            }, 1000);
			        }
			        cache = value; //此处为仅保留最新一类数据，也可改为对象处理多类数据
			    }
		    };
		})();

		// 输入域变动时触发事件
		var changeFunction = function() {
			// 调用入口，可无缝抛弃代理处理直接调用本体
			// ajaxPost.sendPost($postValue.val());
			proxyPost.sendPost($postValue.val());
		};
		$postValue.on('input propertychange', function () {
			changeFunction();
		}).on('keydown', function() {
			changeFunction();
		}).on('keyup', function() {
			changeFunction();
		});
    };

    // 请求数据-实现图片预加载
    var initLoadImg = function() {
    	// 本体，展示图片
		var addImg = (function(){
		    var img = document.createElement('img');
		    document.getElementById('showImg').appendChild(img);
		    return { 
		        setSrc: function(src){
		            img.src = src;
		        }
		    };
		})();
		// 代理层
		var proxyAddImg = (function(){
		    var img = new Image();
		    img.onload = function(){
		        addImg.setSrc(this.src); //图片加载完毕后即刻显示
		    };
		    return { 
		        setSrc: function(src){
		            addImg.setSrc('img/load.gif'); //加载loading占位图
		            img.src = src;
		        }
		    };
		})();
		// 调用入口，可无缝抛弃代理处理直接调用本体
		// addImg.setSrc('img/test.jpg'); 
		proxyAddImg.setSrc('img/test.jpg'); 
    };


    initLoadImg();
    initPost();
})();
