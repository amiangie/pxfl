/*
  Project: pxfl
  Author: angie
 */

  $(function() {
    $('.js-slider').slick({
      dots: false,
      infinite: true,
      speed: 300,
      fade: true,
      slidesToShow: 1,
      adaptiveHeight: true,
      appendArrows: $('.js-slider'),
      prevArrow: $('.js-slider-prev'),
      nextArrow: $('.js-slider-next')
    });  
  });