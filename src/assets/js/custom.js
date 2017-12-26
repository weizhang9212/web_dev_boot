(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
               SLIDER SCRIPTS
               ======================================*/
            $('#carousel-slider').carousel({
                interval: 3000 //TIME IN MILLI SECONDS
            })
            /*====================================
                SCROLLING SCRIPTS
                ======================================*/

            $(function () {
                $('.scrollclass a').bind('click', function (event) { //just pass scrollclass in design and start scrolling
                    var $anchor = $(this);
                    $('html, #welcome').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1200, 'easeInOutExpo');
                    event.preventDefault();
                });
            });
            // ====================================
            // VAGAS SLIDESHOW SCRIPTS
            // ======================================
            $(function () {
                $.vegas('slideshow', {
                    backgrounds: [
                      { src: 'static/img/1.jpg', fade: 1000, delay: 9000 }, 
                      { src: 'static/img/2.jpg', fade: 1000, delay: 9000 }, 
                        
                     
                    ]
                })('overlay', {
                    /** SLIDESHOW OVERLAY IMAGE **/
                    src: 'static/vegas/overlays/03.png' // THERE ARE TOTAL 01 TO 15 .png IMAGES AT THE PATH GIVEN, WHICH YOU CAN USE HERE
                });

            });

          

            /*====================================
               WRITE YOUR SCRIPTS BELOW 
           ======================================*/





        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.main_fun();
    });

}(jQuery));

