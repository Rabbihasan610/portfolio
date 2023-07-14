$(document).ready(function(){

    $(".search-btn").click(function(){
      $(".search-overlay").toggle();
    });

  });
  $('.banner').slick({
    autoplay: false,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
  });
