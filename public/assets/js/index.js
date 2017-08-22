(function($) {
	'use strict';
	var defaults = {
		dataUrl: "", //base64 图片
	}
	function Plugin(element, options) {
		this.opt = $.extend(true, {}, defaults, options);
		this.$start = $("#upData");
		this.$container = $(element);
		this.$avatarView = this.$container.find(".avatar-view");
		this.$label = this.$avatarView.find("label");
		this.$avatarBtns = this.$container.find(".addImg");
		this.$avatarInput = this.$container.find('#fileInput');
		this.$close = this.$container.find(".close-mask");
		this.$avatarSrc = this.$container.find('.avatar-src');
		this.$avatarData = this.$container.find('.avatar-data');
		this.$avatarImgs  = this.$container.find('.showIMG');
		
		this.$avataComplete = this.$container.find('.complete');
		this.init();
	}
	Plugin.prototype = {
		init: function() {
			this.addListener();	//初始化事件
			
		},
		addListener: function(){
			var that = this;
			this.$start.on("click", $.proxy(this.modelShow, this));
			this.$close.on("click", $.proxy(this.modelHide, this));
			this.$avatarInput.on("change", $.proxy(this.change, this));
			this.$avataComplete.on("click", $.proxy(this.endCropper, this));
		},
		modelShow: function(){
			this.$container.removeClass("th-hide").addClass("th-show");
		},
		modelHide: function(){
			this.$container.removeClass("th-show").addClass("th-hide");
			this.$avatarView.find('img').remove();
			this.$label.show();
			this.$avatarInput.after(this.$avatarInput.clone().val(""));      
			this.$avatarInput.remove(); 
			
		},
		change: function(){
			console.log(1)
			var files, file;
			files = this.$avatarInput.prop('files');
			if(files.length > 0) {
				file = files[0];
				if(this.url) {
					URL.revokeObjectURL(this.url);
				}
				this.url = URL.createObjectURL(file);
				this.startCropper();
			}
		},
		startCropper: function() {
			var _this = this;
			if(this.active) {
				this.$img.cropper('replace', this.url);
			} else {
				this.$img = $('<img src="' + this.url + '">');
				this.$label.hide();
				this.$avatarView.append(this.$img);
				this.$img.cropper({
					aspectRatio: 1,
					strict: false,
					crop: function(data) {
						var json = [
							'{"x":' + data.x,
							'"y":' + data.y,
							'"height":' + data.height,
							'"width":' + data.width,
							'"rotate":' + data.rotate + '}'
						].join();
						_this.$avatarData.val(json);
						var $imgData= _this.$img.cropper('getCroppedCanvas')
                        _this.opt.dataUrl = $imgData.toDataURL('image/png');
					}
				});

				this.active = true;
			}
			this.$avataComplete.removeClass("th-hide").addClass("th-show");
		},
		endCropper: function(){
			this.$endCropperImg = $('<img class="endCropper" src="' + this.opt.dataUrl + '">');
			$(".cropper-container").remove();
			this.$avatarView.append(this.$endCropperImg);
			this.$avataComplete.remove();
		}
	}
	
	$.upData = function(options) {
		return new Plugin(options);
	};
})(window.jQuery);
$.upData(".up-competition");
