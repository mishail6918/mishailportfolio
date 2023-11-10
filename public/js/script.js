const body = document.querySelector('html body');
const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0;

    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
};
const preloader = function () {
    window.onload = function() {
        const preloader = document.querySelector('.preloader');
        const loader = document.querySelector('.loader');

        // force page scroll position to top at page refresh
        body.animate({scrollTop: 0});

        // will first fade out the loading animation
        fadeOut(loader, 1500);
        setTimeout(function() {
            fadeOut(preloader, 1500);
        }, 300,)
    }
};

const menuOpen = function() {

    const menuTrigger = document.querySelector('.menu-btn');
    const nav = document.querySelector('.menu-wrapper');
    const closeBtn = nav.querySelector('.menu-wrapper__close');

    // close menu by clicking the close button
    closeBtn.addEventListener('click', function(e){
        e.preventDefault();
        menuTrigger.click();
    });

    // close menu clicking outside the menu itself
    body.addEventListener('click', function (e) {
        if (menuTrigger.contains(e.target)) {
            menuTrigger.classList.toggle('is-clicked');
            body.classList.toggle('menu-is-open');
        }
        else if (!nav.contains(e.target)) {
            menuTrigger.classList.remove('is-clicked');
            body.classList.remove('menu-is-open');
        }
    });
};

const targetScroll = function() {
    const btnScroll = document.querySelectorAll('.target-scroll');
    btnScroll.forEach((element) => {
        element.addEventListener('click', function (e) {
            const targetId = this.hash;
            e.preventDefault();
            e.stopPropagation();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

const gitLinks = function() {
    const links = document.querySelectorAll('.repo-link');
    links.forEach((element) => {
        if (element.getAttribute('href') === '') {
            element.style.display = 'none';
        }
    });
}

const animations = function() {
    var waypoints = $('.animate-this').waypoint({
        handler: function(direction) {
            if (direction === 'down' && !$(this.element).hasClass('animate__animated')) {
                $(this.element).addClass('item-animate');

                setTimeout(function() {
                    $('body .animate-this.item-animate').each(function(ctr) {
                        var el       = $(this),
                            animationEfx = el.data('animate') || null;

                        if (!animationEfx) {
                            animationEfx = 'animate__fadeInUp';
                        }

                        setTimeout( function () {
                            el.addClass(animationEfx + ' animate__animated');
                            el.removeClass('item-animate');
                        }, ctr * 50);

                    });
                }, 100);
            }
            this.destroy();
        },
        offset: '95%'
    })
}

window.onscroll = function() {
    const coords = document.querySelector('.about').getBoundingClientRect();
    if ((coords.y + pageYOffset) < pageYOffset) {
        document.querySelector('.menu-btn').classList.add('menu-btn--bg');
        document.querySelector('#go-top').style.display = 'block';
    }
    else {
        document.querySelector('.menu-btn').classList.remove('menu-btn--bg');
        document.querySelector('#go-top').style.display = 'none';
    }
}

const customCursor = function() {
    const cursor = $(".cursor"),
        follower = $(".cursor-follower");

    gsap.set(".cursor", { xPercent: -50, yPercent: -50 });
    gsap.set(".follower", { xPercent: -50, yPercent: -50 });

    window.addEventListener('mousemove',e => {
        gsap.to(cursor,0.2,{x:e.clientX,y:e.clientY});
        gsap.to(follower,0.9,{x:e.clientX,y:e.clientY});
    });
}

preloader();
menuOpen();
targetScroll();
gitLinks();
animations();
customCursor();
