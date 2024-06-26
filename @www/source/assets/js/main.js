let _common = {
  //鎖住卷軸
  bodyLock() {
    if (deviceDetect() == 'iOS') {
      // bodyScroll.lock();
      $('body').addClass('lock');
    } else {
      $('body').css('overflow-y', 'hidden');
    }
  },
  //解鎖卷軸
  bodyUnlock() {
    if (deviceDetect() == 'iOS') {
      // bodyScroll.unlock();
      $('body').removeClass('lock');
    } else {
      $('body').css('overflow-y', 'auto');
    }
  },
  //Blazy基本
  blazyInit() {
    var bLazy = new Blazy({
      offset: -100,
      success: function () {}
    });
  },
  // 滾動到定位
  scrollPos(target) {
    let $target = $(target);
    let pos = $target.position().top;
    // console.log($target)
    // console.log(pos)
    $('body,html').animate({
      scrollTop: pos
    }, {
      duration: 500,
      // easing: 'easeInOutCirc'
    });
  },
  // resize
  resizeFun(fun) {
    let resize = false;
    let t;
    let doResize = fun;

    $(window).on('resize', function () {
      resize = true;
      clearTimeout(t);
      // console.log('resize')
      t = setTimeout(doResize, 500);
    });
  },
  // waypoint
  eachWaypoint: function (target, offsetValue) {
    $(target).each(function (index, element) {
      $(element).waypoint({
        handler: function () {
          $(element).addClass('show');
        },
        offset: offsetValue,
      });
    });
  },
}

// swiper
let _swiper = {
  near() {
    const setting = {
      on: {
        init() {
          let _this = $(this)[0];
          // getSlidesCount(_this);
        },
      },
      spaceBetween: 20,
      loop: true,
      speed: 800,
      breakpoints: {
        320: {
          slidesPerView: 1.3,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 2,
          centeredSlides: true,
        },
        1201: {
          slidesPerView: 3.5,
          centeredSlides: true,
        },
        1600: {
          slidesPerView: 4,
          centeredSlides: true,
        },
      },
      navigation: {
        nextEl: ".swiper .swiper-button-next",
        prevEl: ".swiper .swiper-button-prev",
      },
    };
    const swiper = new Swiper(".swiper .swiper-container", setting);
  }
}

// index
let _home = {
  // 設定高度
  setHeight() {
    let windowH = $(window).height();
    let conetnt = $(".stable-view");

    conetnt.css("height", windowH * 2);
  },
  // 錨點
  anchor() {
    let btn = $(".banner-scroll");
    // const pos = $("section.content").offset().top;
    btn.on('click',function(){
      $("body,html").animate(
        {
          scrollTop: 500,
        },
        {
          duration: 500,
        }
      );
    });
  },
  // 滾動
  scroll() {
    let zero = 0;
    let banner = $(".banner");
    let windowH = $(window).height();

    $(window).on('scroll',function(){
      let scrollAfter = $(this).scrollTop();
      banner.css("top", "-" + scrollAfter + "px");
      
      // 下滾
      if (scrollAfter > zero && scrollAfter > windowH / 4) {
        $(".banner-scroll").addClass("opacity");
        if (scrollAfter > windowH / 3) {
          $(".banner-scroll").addClass("hide");
          if (scrollAfter > windowH / 2) {
            $('.hd').addClass('show');
          }
        }
      }
      // 上滾
      else if (scrollAfter < zero ) {
        if (scrollAfter < windowH / 4) {
          $(".banner-scroll").removeClass("opacity");
        }
        else if (scrollAfter < windowH / 3) {
          $(".banner-scroll").removeClass("hide");
          
        }
        else if  (scrollAfter < windowH / 2) {
          $(".hd").removeClass("show");
        }
      }
      
      // console.log(scrollAfter);
      zero = scrollAfter;
    })
  },
  // 04/25 修改
  // 複製header結構
  cloneHeader() {
    let hd = $("header.hd");
    let clone = $(".hd.clone");
    
    if (clone.length === 0 ) {
      let hdClone = hd.clone().addClass('clone');
      $("section.content").prepend(hdClone);
    }
  },
  textEffect(){
    let text = $(".banner-scroll .text-wrap");
    let val = text.text();
    let newEle = `<div><span> ${val
      .trim()
      .split("")
      .join("</span><span>")} </span></div>`;
    text.html(newEle);
  },
  all() {
    _home.setHeight();
    // _home.cloneHeader();
    _home.anchor();
    _home.scroll();
    _home.textEffect()
  }
}

let _list = {
  // 分類點擊
  select() {
    let btn = $(".select-list li");
    btn.on("click", function () {
      $(this).toggleClass("active");

      if ($(this).hasClass("all")) {
        $(this).siblings().removeClass("active");
      } else {
        $(".select-list li.all").removeClass("active");
      }
    });
  },
  // 回到文本最上方
  anchorContent() {
    $(".content-wrap .scrollbar-inner").animate(
      {
        scrollTop: 0,
      },
      {
        duration: 500,
      }
    );
  },
  
  all() {
    _list.select();
    if($(window).width() > 1200) {
      $(".scrollbar-inner").scrollbar();
    }
  }
};

let _detail = {
  // 錨點
  anchor() {
    let btn = $(".btn-anchor");
    btn.on('click',function(){
      _common.scrollPos(".map");
    })
  },
  scroll() {
    // if($(window).width() >= 1201) return;

    let zero = 0;
    let anchor = $(".btn-anchor");
    let conetnt = $(".content article"),
        conetntTop = conetnt.offset().top,
        conetntH = conetnt.outerHeight(),
        contentZone = conetntTop + conetntH - $(window).height();
    $(window).on('scroll',function(){
      let scrollAfter = $(this).scrollTop();

      // 往下滾動
      if (scrollAfter > zero) {
        // 超過上文 隱藏
        if(scrollAfter > contentZone) {
          anchor.addClass('hide');
        }
      }
      else {
        if (scrollAfter < contentZone) {
          anchor.removeClass("hide");
        }
      }

      zero = scrollAfter;
    })
  },
  share() {
    const btn = $(".btn-share");
    let val = $('[data-msg]').attr('data-msg');
    let msg = val || document.title
    let locationTitle = $('.text h2').text();

    const shareData = {
      title: locationTitle,
      text: msg,
      url: document.location.href,
    };

    btn.on('click',function (){
      navigator.share(shareData);
    })
  },
  all() {
    _detail.anchor();
    _detail.scroll();
    _detail.share();
  }
}

let _map = {
  device() {
    if ($(window).width() <= 1000) {
      $(".content-list").addClass("mobile");
      _map.spreadMobile();
      _map.setIndex();
    } else {
      $(".content-list").removeClass("mobile");
    }
  },
  setIndex() {
    let li = $(".content-list li");
    li.each((i,ele)=>{
      // console.log(i);
      $(ele).attr("data-index", Number(i + 1));
    })
  },
  spreadMobile() {
    let scrollContainer = $(".content-list .scrollbar-inner");

    if(!$(".content-list.mobile").hasClass('show')) {
      $(".content-list.mobile").addClass('show');
    }

    $(".content-list.mobile")
      .on("click", function () {
        if(!$(this).hasClass('show')) {
          $(this).addClass('show');
        }
        else{
          $(this).removeClass("show");
        }
      });

    $(".content-list.mobile li").on("click", function (e) {
      let i = $(this).attr('data-index');
      let firstLi = $(".content-list.mobile li:nth-child(1)").outerHeight();
      let getHeight = function() {
        let h = 0;
        for (let j = 0; j < i; j++) {
          h += $(`.content-list.mobile li:nth-child(${j + 1})`).outerHeight();
        }
        return h
      }
      // console.log(getHeight());
      e.stopPropagation();
      $(".content-list.mobile").removeClass('show')
      // scrollContainer.scrollTop(getHeight() - firstLi);
      scrollContainer.animate(
        {
          scrollTop: getHeight() - firstLi - 5,
        },
        {
          duration: 500,
        }
      );

    });
  },
  all() {
    _map.device();
  }
};

let _footer = {
  // 語系初始設定
  initLang() {
    let lang = $(".btn-lang .text-lang").attr("data-lang");
    // console.log(lang);
    if (lang === "en") {
      $(`[list-lang="en"]`).fadeOut();
    } else if (lang === "tc") {
      $(`[list-lang="tc"]`).fadeOut();
    } else if (lang === "sc") {
      $(`[list-lang="sc"]`).fadeOut();
    }
  },
  // 打開
  openLang(){
    let btn = $(".btn-lang .text-lang");
    btn.on('click',function(){
      let lang = $(this).attr('data-lang');

      if(!$(this).hasClass('active')){
        $(this).addClass("active");
        // $(this).siblings().fadeIn(200)
        if(lang === 'en') {

        }
      }
      else{
        $(this).removeClass('active')
        // $(this).siblings().fadeOut(200);
      }
    })
  },
  // 切換語系
  switchLang() {
    let btn = $('[list-lang]');
    let langText = $(".btn-lang .text-lang");
    btn.on('click',function(){
      let lang = $(this).attr('list-lang');
      let text = $(this).find('span').text();
      let langFun = function (vm, text, lang) {
        langText.text(text).removeClass("active");
        langText.attr("data-lang", lang);
        // $(".btn-lang ul").fadeOut();
        setTimeout(() => {
          vm.fadeOut();
          vm.siblings().fadeIn(200);  
        }, 300);
      };

      if (lang === "tc") {
        langFun($(this), text, lang);
      } else if (lang === "en") {
        langFun($(this), text, lang);
      } else if (lang === "sc") {
        langFun($(this), text, lang);
      }
    })
  },
  // 手機板
  mobileLang() {
    let btn = $(".btn-lang .text-lang");
    let langBtn = $(".btn-lang ul");
    if(btn.length) {
      let pos = btn.offset().left;
      if ($(window).width() <= 1200) {
        langBtn.css("left", pos);
      }
    }
  },
  all() {
    _footer.initLang();
    _footer.openLang();
    _footer.switchLang();
    _footer.mobileLang();
    _common.resizeFun(_footer.mobileLang);
    clickSwitchClass(".ft >ul li", "active");
  }
}

//頁面讀取完執行
const readyFunction = {
  checkFunction() {
    //擷取body的data-page
    var functionName = $("body").attr("data-page");
    //呼叫共用function
    readyFunction.common(functionName);
    //呼叫函數( 如果 data-page = home 輸出的結果為 readyFunction.home(); )
    // eval("readyFunction." + functionName + "();");
    if (functionName !== undefined) {
      eval("readyFunction." + functionName + "();");
    }
  },

  //呼叫共用function
  common(pagename) {
    // console.log(`Now page is ${pagename}!`);
    //判斷瀏覽器/系統
    if (deviceDetect() == "Mac") {
      $("html").addClass("isMac");
    }
    //除Mac系統 & IE瀏覽器外
    if (
      deviceDetect() != "Mac" &&
      (window.ActiveXObject || !("ActiveXObject" in window))
    ) {
      $("html").addClass("scrollbarStyle");
    }
    //iOS 回上一頁空白修正
    appleDebug();
    //iOS viewHeight 計算
    fixMobile100vh();
    //Blazy
    // _common.blazyInit();
    _footer.all();
  },

  //呼叫各頁面function
  home() {
    _home.all();
    _list.all();
  },
  list() {
    _list.all();
  },
  map(){
    // $('.scrollbar-inner').scrollbar();
    // _map.all();
  },
  nearby() {
    _swiper.near();
  },
  detail(){
    _detail.all();
  },
};

$(document).ready(function () {
  readyFunction.checkFunction();
})
