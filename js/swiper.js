const clientSwiper = new Swiper(".client-swiper", {
  slidesPerView: 3,
  initialSlide: 2,
  navigation: {
    nextEl: ".client-swiper-button-next",
    prevEl: ".client-swiper-button-prev",
  },
  spaceBetween: 20,

  breakpoints: {
    20: {
      slidesPerView: 1,
      centeredSlides: true,
    },

    670: {
      slidesPerView: 2,
      centeredSlides: true,
    },
    1440: {
      slidesPerView: 3,
    },
  },
})
