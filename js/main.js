// Custom scripts
// Мобильное меню бургер
const burger = document.querySelector(".burger")
const menu = document.querySelector(".menu")
const body = document.querySelector("body")
function burgerMenu() {
  burger.addEventListener("click", () => {
    if (!menu.classList.contains("active")) {
      menu.classList.add("active")
      burger.classList.add("active")
      body.classList.add("locked")
    } else {
      menu.classList.remove("active")
      burger.classList.remove("active")
      body.classList.remove("locked")
    }
  })

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove("active")
      burger.classList.remove("active-burger")
      body.classList.remove("locked")
    }
  })
}
burgerMenu()

// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector("nav")

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add("fixed__nav")
  } else {
    nav.classList.remove("fixed__nav")
  }
}
window.addEventListener("scroll", fixedNav)

//Прокрутка
const menuLinks = document.querySelectorAll(".menu__item-link[data-goto]")
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick)
  })

  function onMenuLinkClick(e) {
    const menuLink = e.target
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto)
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector("header").offsetHeight

      if (menu.classList.contains("active")) {
        document.body.classList.remove("locked")
        menu.classList.remove("active")
        //menuBody.classList.remove("active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      })
      e.preventDefault()
    }
  }
}

function accordion() {
  const items = document.querySelectorAll(".accordion__item-trigger")
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const parent = item.parentNode
      const content = parent.querySelector(".accordion__item-content")
      if (parent.classList.contains("accordion__item-active")) {
        content.style.maxHeight = null
        parent.classList.remove("accordion__item-active")
      } else {
        document.querySelectorAll(".accordion__item-content").forEach((el) => {
          el.style.maxHeight = null
        })
        document.querySelectorAll(".accordion__item").forEach((child) => {
          child.classList.remove("accordion__item-active")
        })
        parent.classList.add("accordion__item-active")
        content.style.maxHeight = content.scrollHeight + "px"
      }
    })
  })
}
accordion()
