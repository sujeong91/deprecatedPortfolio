/* 실행 */
$(function(){

  /*
   *  UI 스크립트
   */

  portfolio.init();

});

var portfolio = {
  init : function() {
    this.scrollChangeHeader();
    this.menuUnderlineEffect();
    this.showDetail();
    this.responsiveHeader();
    this.portfolioPop();
  },

  scrollChangeHeader : function() {
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
  },

  menuUnderlineEffect : function () {
    var $navItem = null;            // 메뉴
    var $section = null;            // section
    var $window = null;             // window
    var $currentNavItem = null;     // 현재 메뉴
    var $sectionLocation = null;    // 이동하는 섹션의 위치
    var winSct = 0;                 // 현재 윈도우의 top위치
    var activeScroll = true;        // 스크롤 이벤트 작동여부
  
    function start() {
      init();
      initEvent();
    }
  
    function init() {
      $navItem = $(".header-nav-item");
      $section = $("section");
      $window = $(window);
    }
  
    function initEvent() {
      $navItem.on("click", function(event){
        event.preventDefault();
        var that = $(this);
        activeScroll = false;
        underlineEffect(that);
        linkSection();
      });
  
      $window.scroll(function(){
        if ( activeScroll == true ) {
          winSct = $window.scrollTop();
          currentNav();
        }
      });
    }
  
    function underlineEffect(that) {
      if ( $currentNavItem ) $currentNavItem.removeClass("on");
  
      $currentNavItem = that;
      $currentNavItem.addClass("on");
    }
  
    function linkSection() {
      $sectionLocation = $("#" + $currentNavItem.attr("href")).offset().top;
      $('html,body').stop().animate({scrollTop : $sectionLocation - 55}, 1000, "easeInOutCubic", function() {
        activeScroll = true;
      });
    }
  
    function currentNav() {
      $section.each(function () {
        var $self = $(this),
            selfValue = $self.attr("id"),
            selfNav = $(".header-nav-item[href=" + selfValue + "]"),
            secOft = $self.offset().top,
            checkCurrent = secOft - winSct;
  
        if ( checkCurrent < 300 ) {
          underlineEffect(selfNav);
        }
      });
    }
  
    start();
  },

  showDetail : function () {
    $(".portfolio-frame").on({
      "mouseenter": function() {
        $(this).children(".portfolio-hiddenFrame").fadeIn();
      },
      "mouseleave": function() {
        $(this).children(".portfolio-hiddenFrame").fadeOut();
      }
    });
  },

  responsiveHeader : function() {
    if ($(window).width() <= 375) {
      $(".header-logo").click(function(e){
        e.preventDefault();
  
        if ( $(".header-nav").hasClass("open") ) {
          $(".header-nav").removeClass("open");
          $(".header-nav").slideUp();
        } else {
          $(".header-nav").addClass("open");
          $(".header-nav").slideDown();
        }
      });
    }
  },

  portfolioPop : function() {
    $(".pf_btn").click(function(e){
      if ( $(this).parent("a").attr("href") === "#!") {
        e.preventDefault();
        myLib.pop("준비 중 입니다.");
      }
    });
  }

};

// var myLib = {
//   pop : function(msg) {
//     var popUI = $("<div class='popBg'><div class='popContent'>"+ msg +"</div></div>");
//     $("body").prepend(popUI);
//     $(".popBg").stop().delay(1000).animate({"opacity": 0}, {
//       duration: 1500,
//       complete: function(){ $(".popBg").remove(); }
//       }
//     );
//   }
// };