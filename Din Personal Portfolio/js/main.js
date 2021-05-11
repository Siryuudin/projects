
(function($){
    "use strict"
    var Din = {};


    /*--------------------
        * Header Class
    ----------------------*/
    Din.HeaderSticky = function(){
        $(".navbar-toggler").on("click", function(a) {
            a.preventDefault(), $(".navbar").addClass("sticky-header")
        });
    }

    Din.MenuTogglerClose = function(){
      $(".toggler-menu").on('click', function () {
          $(this).addClass("open");
          $(".top-side-nav").addClass("menu-open");
          $(".menu-overlay").addClass("overlay-show");
      });
      $(".menu-toggler-close, .menu-overlay, .top-side-nav li a").on('click', function () {
          $(".toggler-menu").removeClass("open");
          $(".top-side-nav").removeClass("menu-open");
          $(".menu-overlay").removeClass("overlay-show");
      });
    }
    /*--------------------
        * Menu Close
    ----------------------*/
    Din.MenuClose = function(){
      $('.navbar-nav .nav-link').on('click', function() {
       var toggle = $('.navbar-toggler').is(':visible');
       if (toggle) {
         $('.navbar-collapse').collapse('hide');
       }
      });
    }

    /*--------------------
        * Smooth Scroll
    ----------------------*/
    Din.HeaderScroll = function(){
        $('a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
              var target = $(this.hash);
                  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                  if (target.length) {
                    $('html,body').animate({
                      scrollTop: target.offset().top - 65,
                      }, 1000);
                      return false;
                  }
            }
        });
    }

    /*--------------------
        * Header sticky
    ----------------------*/
    Din.HeaderSticky = function(){
        if ($(window).scrollTop() >= 60) {
           $('.navbar').addClass('sticky-header');
        }
        else {
           $('.navbar').removeClass('sticky-header');
        }
    }    

    /*--------------------
        * Progress Bar for skill section
    ----------------------*/
    Din.ProgressBar = function(){
        $(".progress .progress-bar").each(function () {
          var bottom_object = $(this).offset().top + $(this).outerHeight();
          var bottom_window = $(window).scrollTop() + $(window).height();
          var progressWidth = $(this).attr('aria-valuenow') + '%';
          if(bottom_window > bottom_object) {
            $(this).css({
              width : progressWidth
            });
          }
        });
    }

  /*magnific
passion mansory for pop up and filter*/
$('.passion-menu ul li').click(function(){
  $('.passion-menu ul li').removeClass('active');
  $(this).addClass('active');
  
  var selector = $(this).attr('data-filter');
  $('.passion-item').isotope({
    filter:selector
  });
  return  false;
});
$(document).ready(function() {
var popup_btn = $('.popup-btn');
popup_btn.magnificPopup({
type : 'image',
gallery : {
  enabled : true
}
});
});

    /*--------------------
    * Isotope for typing text on background image
    ----------------------*/

     Din.mTypeIt = function() {
        new TypeIt('#type-it', {
            speed: 200,
            loop:true,
            strings: [
              'Just A Person',
              'An Ailurophile Lover'
            ],
            breakLines: false
        }); 
    }

    
    

    $(document).on("ready", function(){
        Din.MenuClose(),
        Din.MenuTogglerClose(),
        Din.ProgressBar(),
        Din.HeaderScroll(),
        Din.mTypeIt(),
        Din.HeaderSticky();
    });

    $(window).on("scroll", function(){
        Din.ProgressBar(),
        Din.HeaderSticky();
    });

})(jQuery);


