$(document).ready(function(){
  $('.f_slider').owlCarousel({
    center: true,
    items:4,
    loop:true,
    margin:0,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:false,
    autoplaySpeed:2000,
    responsive:{
        800:{
            items:2
        }
    }
  });
})
