"use strict";

function RolAi() {
    const that = this;
    const typedText = "Future of Watch ^800 \n is on your wrist."; // typing text at the header, ^800 - delay
    const serverSendMailUrl = "api/mailto.ajax.php";
    const isParalax = true;

    this.init = function () {
        this.initModules();

        $('.input').blur(function () {
            $(this).closest('form').removeClass("focus");
        }).focus(function () {
            $(this).closest('form').addClass("focus")
        });

        $('.js-copy-link').on('click', function (e) {
            e.preventDefault();
            var copyText = $(this).attr('href');

            document.addEventListener('copy', function (e) {
                e.clipboardData.setData('text/plain', copyText);
                e.preventDefault();
            }, true);

            document.execCommand('copy');
        });

        //paralax (only for desktop)
        if ($(window).width() >= 860 && isParalax) {
            var sliderEl_1 = $("#slide1");
            var sliderEl_2 = $("#slide2");
            var headerEl = $("#header--bg");

            $(window).on('scroll', function (event) {
                var wheight = window.innerHeight * 0.05;
                var paralax_1 = 0.1 * $(window).scrollTop() - wheight;
                var paralax_2 = 0.17 * $(window).scrollTop() - wheight;

                sliderEl_1.css("transform", 'translate3d(0px, -' + paralax_1 + 'px, 0px)');
                sliderEl_2.css("transform", 'translate3d(0px, -' + paralax_2 + 'px, 0px)');

                var paralaxBg = 0.25 * $(window).scrollTop();
                headerEl.css("transform", 'translate3d(0px, ' + paralaxBg + 'px, 0px)');
            });
        }

        //send form
        $(".header__form--button,.footer__form--button").on('click', function () {
            var order = {};
            var me = $(this);
            me.parents('form').find(".form--wrap").removeClass('error');
            order.email = me.parents('form').find(".email").val();

            if (!that.validateForm(order)) {
                me.parents('form').find(".form--wrap").addClass('error');
            }
            if (that.validateForm(order)) {
                $.ajax({
                    type: 'POST',
                    url: serverSendMailUrl,
                    data: {
                        'order': order
                    }, success: function (result) {
                        if (result.email == 1) {
                            me.parents('form').find(".form--wrap").addClass('error');
                        }
                        if (result.email != 1) {
                            me.parents('form').find(".form--wrap").removeClass('error');
                            if (result.datasuccess == 'true') {
                                $('#congratulations').css('top', $(window).scrollTop() + 50 + 'px');
                                $('#congratulations, #maska').velocity("fadeIn", {duration: 400});
                            } else {
                                alert('Error! Something wrong');
                            }
                        }
                    },
                    dataType: 'json'
                });
            }
            return false;
        });

        //close popups
        $(".popup--close, #maska").on('click', function () {
            $('#congratulations, #maska').velocity("fadeOut", {duration: 400});
            return false;
        });
    },

        this.validateForm = function (obj) {
            var error = false;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (obj[key] !== '') {
                        error = true
                    }
                }
            }
            if (obj.email !== undefined) {
                var validEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!validEmail.test(obj.email)) {
                    error = false
                }
            }
            return error;
        },

        this.initModules = function () {
            $("#typed").text('');
            $("#typed").typed({
                strings: [typedText],
                typeSpeed: 16,
            });
            var $carousel_1 = $('#slide1 .main-carousel').flickity({
                freeScrollFriction: 0.03,
                cellAlign: 'left',
                contain: true,
                pageDots: false,
                prevNextButtons: false,
                nextNextButtons: false,
                wrapAround: true,
                draggable: false
            });
            $('#slide1 .slide--button.right').on('click', function () {
                $carousel_1.flickity('next', true);
            });
            $('#slide1 .slide--button.left').on('click', function () {
                $carousel_1.flickity('previous', true);
            });

            var $carousel_2 = $('#slide2 .main-carousel').flickity({
                freeScrollFriction: 0.03,
                cellAlign: 'left',
                contain: true,
                pageDots: false,
                prevNextButtons: false,
                nextNextButtons: false,
                wrapAround: true,
                draggable: false
            });
            $('#slide2 .slide--button.right').on('click', function () {
                $carousel_2.flickity('next', true);
            });
            $('#slide2 .slide--button.left').on('click', function () {
                $carousel_2.flickity('previous', true);
            });
        }
};

(function ($) {
    'use strict';
    var main = new RolAi();
    main.init();
}(jQuery));



