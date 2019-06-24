$().ready(function(){
    $('.banner .action-slide').on('click', function(e){
        e.preventDefault();
        TweenLite.to(window, 2, {scrollTo:{y:$('#root').offset().top}, ease: Power2.easeIn});
    });
    $('.back-to-top').on('click', function(e){
        e.preventDefault();
        TweenLite.to(window, 1.5, {scrollTo:{y:$('#root').offset().top}, ease: Power2.easeIn});
    });
});
!function(e) {
    var o = new ScrollMagic.Controller;
    var a = new TimelineMax;

    a.to(e(".banner .logo-text"), .1, { autoAlpha: 0, ease: Power1.easeNone})
        .to(e(".banner h1"), .2, { autoAlpha: 0, ease: Power1.easeNone}, "-=0.1")
        .to(e(".banner .banner-navigator"), .2, { autoAlpha: 0, ease: Power1.easeNone}, "-=0.1")
        .to(e(".banner"), 1.4, { y: "20%", ease: Power1.easeOut }, "-=0.2")
        .to(e(".banner .banner-cover"), .3, { autoAlpha: 0.9, ease: Power1.easeNone }, "-=1.3");

    {
        new ScrollMagic.Scene({
            triggerElement: ".banner",
            triggerHook: 0,
            duration: "100%"
        }).setTween(a).addTo(o)
    }
    o.scrollTo(function(e) {
        TweenMax.to(window, 1, {
            scrollTo: {
                y: e
            },
            ease: Power1.easeInOut
        })
    });
}(jQuery);