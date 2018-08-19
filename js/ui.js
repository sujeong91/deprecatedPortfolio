/*
 * [func] scrollChangeHeader
 * : 지정한 포인트에 스크롤이 지나가면 header 변환
 */

function scrollChangeHeader() {
  var $header = null;
  var $headerLogo = null;
  var windowScrollTop = 0;
  var point = 0;

  function start() {
    init();
    initEvent();
  }

  function init() {
    $header = $("header");
    $headerLogo = $(".header-logo img");
    point = 100;
  }

  function initEvent() {
    $(document).scroll(function() {
      windowScrollTop = $(window).scrollTop();
      
      if ( windowScrollTop > point ) {
        $header.addClass("scrollOn");
        $headerLogo.attr("src", "img/header-logo.png");
      } else {
        $header.removeClass("scrollOn");
        $headerLogo.attr("src", "img/header-logo-white.png");
      }
    });
  }

  start();
}

/*
 * [func] menuUnderlineEffect
 * : 메뉴 밑줄 효과
 */

function menuUnderlineEffect() {
  var $navItem = null;
  var $currentNavItem = null;
  var $sectionLocation = null;
  var currentLocation = 0;

  function start() {
    init();
    initEvent();
  }

  function init() {
    $navItem = $(".header-nav-item");
  }

  function initEvent() {
    $navItem.on("click", function(event){
      event.preventDefault();
      var that = $(this);
      underlineEffect(that);
      linkSection();
    });

    $(window).scroll(function(){
      currentLocation = $(document).scrollTop();
      // console.log(currentLocation);
      // 스크롤 될 때마다 해당 section을 찾아서  해당 메뉴에 언더라인 칠하기
    });
  }

  function underlineEffect(that) {
    if ( $currentNavItem ) {
      $currentNavItem.removeClass("on");
    }

    $currentNavItem = that;
    $currentNavItem.addClass("on");
  }

  function linkSection() {
    $sectionLocation = $($currentNavItem.attr("href")).offset().top;
    $('html,body').stop().animate({scrollTop : $sectionLocation - 55}, 1000);
  }

  start();
}


/* 실행 */
$(document).ready(function() {
  scrollChangeHeader();
  menuUnderlineEffect();
});