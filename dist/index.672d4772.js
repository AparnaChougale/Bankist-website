"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const openModal = function(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
// New way
btnsOpenModal.forEach((btn)=>btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
// Scrolling
btnScrollTo.addEventListener("click", function(e) {
    const s1coord = section1.getBoundingClientRect();
    section1.scrollIntoView("smooth");
});
// Event deligation using bubbling
// 1. add an event to common parent element
// 2. determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function(e) {
    e.preventDefault();
    // Matching strategy
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
});
// Tabbed components
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
tabContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest(".operations__tab");
    // Guard clause
    if (!clicked) return;
    // Removing active classes
    tabs.forEach((t)=>t.classList.remove("operations__tab--active"));
    tabsContent.forEach((c)=>c.classList.remove("operations__content--active"));
    // Activate tab
    clicked.classList.add("operations__tab--active");
    // Activate content area
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});
// Menu fade animation
const nav = document.querySelector(".nav");
// way-1
const handleOver = function(e, opacity) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        const logo = link.closest(".nav").querySelector("img");
        siblings.forEach((el)=>{
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
};
// passing "argument" in handle function
nav.addEventListener("mouseover", handleOver.bind(0.5));
nav.addEventListener("mouseout", handleOver.bind(1));
// Sticky navigation
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);
// Reveal sections
const allSelections = document.querySelectorAll(".section");
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};
const selectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
});
allSelections.forEach(function(section) {
    selectionObserver.observe(section);
    section.classList.add("section--hidden");
});
// Lazy image loading
const imgTarget = document.querySelectorAll("img[srcset]");
const loadImg = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    // Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function() {
        entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "200px"
});
imgTarget.forEach(function(img) {
    imgObserver.observe(img);
});
// Slider
const slider = function() {
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotConatiner = document.querySelector(".dots");
    let curSlide = 0;
    const maxSlide = slides.length;
    // create Dots
    const createDots = function() {
        slides.forEach(function(_, i) {
            dotConatiner.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };
    // Activate dot
    const activateDot = function(slide) {
        document.querySelectorAll(".dots__dot").forEach((dot)=>dot.classList.remove("dots__dot--active"));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
    };
    const goToSlide = function(slide) {
        slides.forEach((s, i)=>s.style.transform = `translateX(${100 * (i - slide)}%)`);
    };
    // Next slide
    const nextSlide = function() {
        if (curSlide === maxSlide - 1) curSlide = 0;
        else curSlide++;
        goToSlide(curSlide); // curSlide=1 : -100%, 0%, 100%, 200%
        activateDot(curSlide);
    };
    const prevSlide = function() {
        if (curSlide === 0) curSlide = maxSlide - 1;
        else curSlide--;
        goToSlide(curSlide);
        activateDot(curSlide);
    };
    const init = function() {
        createDots();
        activateDot(0);
        goToSlide(0); // 0%, 100%, 200%
    };
    init();
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);
    // slide with arrow keys
    document.addEventListener("keydown", function(e) {
        if (e.key === "ArrowLeft") prevSlide();
        e.key === "ArrowRight" && nextSlide();
    });
    // Slide when clicked on dots - using Event deligation instead of attaching event handle to each dot - event handler is attached to parent class i.e. dots
    dotConatiner.addEventListener("click", function(e) {
        if (e.target.classList.contains("dots__dot")) {
            const slide = e.target.dataset.slide;
            // const {slide} = e.target.dataset; // same as above using onject destructuring
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();

//# sourceMappingURL=index.672d4772.js.map
