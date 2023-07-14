
 $('.banner').slick({
  rtl: false, 
  autoplay: false, 
  // dots:true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll:1,
});

$('.slider').slick({
    autoplay: false,
    dots:true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll:1,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
        }
        },
        {
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true
        }
        },
        {
        breakpoint: 768,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
    });

   


    $('.feature-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      responsive: [
          {
          breakpoint: 1024,
          settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
          }
          },
          {
          breakpoint: 992,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
          }
          },
          {
          breakpoint: 768,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
          }
          },
          {
          breakpoint: 600,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
          }
          },
          {
          breakpoint: 480,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1
          }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
      ]
      });



      // $('.feature-slider').slick({
      //   slidesToShow: 3,
      //   slidesToScroll: 1,
      //   autoplay: true,
      //   autoplaySpeed: 2000,
      // })
      $('.testimonial-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
      

      $('.logo-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
        