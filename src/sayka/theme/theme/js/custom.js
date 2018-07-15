$(document).ready(function(){

ytCode = '<video id="rebuilt-video" src="/sayka/++plone++sayka.theme/rebuilt.mp4" type="video/mp4" autoplay width="100%"></video>'
imgCode = $('#imgCode').prop("outerHTML")

$($('.sidebar-page-container.bg_1')[0]).mouseenter( function(){
        if ( ! Boolean($('.sidebar-page-container.bg_1 video')[0]) ){
            $($('.sidebar-page-container.bg_1')[0]).html(ytCode)
        }
})

$($('.sidebar-page-container.bg_1')[0]).mouseout( function(){
    $($('.sidebar-page-container.bg_1')[0]).html(imgCode)
})



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
