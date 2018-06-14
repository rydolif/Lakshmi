$(document).ready(function() {
    $('#my_popup').popup();
});
$(document).ready(function() {
    $('#my_popup-1').popup();
});
$(document).ready(function() {
    $('#my_popup-2').popup();
});

$('.mobile-tab').hide();
$('.burg').on('click', function(){
  $('.mobile-tab').slideToggle(300);
});


$(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 300);
    });
});
$(document).ready(function(){
    $("#mobile").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 300);
    });
});
$(document).ready(function(){
    var burg = $(".burg");
    var burg_active = $(".burg-active");
    burg.click(function () {
        burg.toggleClass("burg-active");
    });
    burg_active.click(function () {
        burg.removeClass("burg-active");
    });
});
