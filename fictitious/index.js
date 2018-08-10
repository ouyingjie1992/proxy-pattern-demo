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

		var ajaxPost = function(value){
			var html = '';
			html += '<p>';
			html += '请求接口...参数为value=' + value;
			html += '</p>';
		    $showPost.prepend(html);
		};
		var proxyPost = (function(){
		    var cache = '', 
		        timer;
		    return function(value){
		        if(!timer){
		            timer = setTimeout(function(){
		                ajaxPost(cache);
		                cache = '';
		                clearTimeout(timer);
		                timer = null;
		            }, 1000);
		        }
		        cache = value;
		    };
		})();

		$postValue.on('input propertychange', function () {
			proxyPost($postValue.val());
		}).on('keydown', function() {
			proxyPost($postValue.val());
		}).on('keyup', function() {
			proxyPost($postValue.val());
		});
    };

    // 请求数据-实现图片预加载
    var initLoadImg = function() {
		var addImg = (function(){
		    var img = document.createElement('img');
		    document.getElementById('showImg').appendChild(img);
		    return { 
		        setSrc: function(src){
		            img.src = src;
		        }
		    };
		})();
		var proxyAddImg = (function(){
		    var img = new Image();
		    img.onload = function(){
		        addImg.setSrc(this.src); 
		    };
		    return { 
		        setSrc: function(src){
		            addImg.setSrc('img/load.gif'); 
		            img.src = src;
		        }
		    };
		})();
		proxyAddImg.setSrc('img/test.jpg'); 
    };


    initLoadImg();
    initPost();
})();
