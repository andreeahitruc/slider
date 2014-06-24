function Slider(cont,imageWidth,speedFadeIn,speedFadeOut,speedSlider){
	cont.find('.slider-image').first()
		.clone().insertAfter('div.slider-image:last');
	this.cont = cont;
	this.imageWidth = $(window).width();

	this.speedFadeIn = speedFadeIn;
	this.speedFadeOut = speedFadeOut;
	this.speedSlider = speedSlider;

	this.imageLen = $('.slider div').length;
	$('.slider div').css('width', imageWidth);
	$('.slider').css('width', this.imageWidth * this.imageLen);
	this.current = 0;
};
Slider.prototype.slide = function(direction) {
	this.fadeOut();
	this.direction = direction;
};
Slider.prototype.fadeOut = function() {
	var fadeVar = $('.slider').children().eq(this.current).children();
	fadeVar
		.animate({
			opacity: 0
			}, this.speedFadeOut, this.slideTo.bind(this))
};
Slider.prototype.increment = function() {
	this.current = (1 + this.current) % this.imageLen;
};
Slider.prototype.decrement = function() {
	this.current = (this.current - 1);
	
	if(this.current < 0) {
		this.current = this.imageLen - 1;
	}
};	 	
Slider.prototype.slideTo = function() {
	var sl = $('.slider');
	if(this.direction === 'next'){
		if(this.current === this.imageLen - 1){
			sl.css({
				marginLeft: 0
			})
			this.current = 0;
		}
		this.increment();
	}
	else {
		if(this.current === 0){
			sl.css({
				marginLeft: -(this.imageLen - 1) * this.imageWidth
			})
			this.current = this.imageLen - 1;
		}
		this.decrement();
	}
	sl.animate({
			marginLeft: -this.imageWidth * this.current
		}, this.speedSlider, this.fadeIn.bind(this))
};
Slider.prototype.fadeIn = function() {
	var fadeVar = $('.slider').children().eq(this.current).children();
	fadeVar
		.animate({
			opacity: 1
		}, this.speedFadeIn)
};
