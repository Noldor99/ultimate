/* =========== Burger menu ================*/
const iconMenu = document.querySelector(".icon-menu")
const navLink = document.querySelectorAll(".menu__link")
const mainElement = document.querySelector("main")
const footerElement = document.querySelector("footer")

if (iconMenu) {
  const menuBody = document.querySelector(".menu__body")
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock")
    iconMenu.classList.toggle("_active")
    menuBody.classList.toggle("_active")
  })

  navLink.forEach((link) => {
    link.addEventListener("click", function () {
      document.body.classList.remove("_lock")
      iconMenu.classList.remove("_active")
      menuBody.classList.remove("_active")
    })
  })
  ;[mainElement, footerElement].forEach((element) => {
    element.addEventListener("click", function () {
      document.body.classList.remove("_lock")
      iconMenu.classList.remove("_active")
      menuBody.classList.remove("_active")
    })
  })
}
/* =========== SHOW HEADER BLUR AND BACKGROUND ================*/
window.addEventListener("scroll", function () {
  var header = document.getElementById("header")
  var scrollPosition = window.scrollY

  if (scrollPosition > 20) {
    header.classList.add("scroll-active")
  } else {
    header.classList.remove("scroll-active")
  }
})
/*=============== SCROLL SECTIONS===============*/
function onMenuLinkClick(e) {
  const menuLink = e.target
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto)
    const gotoBlockValue =
      gotoBlock.getBoundingClientRect().top +
      window.scrollY -
      document.querySelector("header").offsetHeight

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    })
    e.preventDefault()
  }
}

const menuLinks = document.querySelectorAll(".menu__link[data-goto]")
if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick)
  })
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]")

const scrollActive = () => {
  const scrollDown = window.scrollY

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 110,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        ".menu__body a[data-goto*=" + sectionId + "]"
      )
    if (sectionClass) {
      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
        sectionClass.classList.add("active-link")
      } else {
        sectionClass.classList.remove("active-link")
      }
    }
  })
}

window.addEventListener("scroll", scrollActive)

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

/*=============== Scroll Animation ===============*/
const animItems = document.querySelectorAll("._anim-items")

if (animItems.length > 0) {
  // Запуск анимации с помощью события
  window.addEventListener("scroll", animOnScroll)
  function animOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index]
      const animItemHeight = animItem.offsetHeight
      const animItemOffset = offset(animItem).top
      // Регулирует момент старта анимации
      const animStart = 4

      let animItemPoint = window.innerHeight - animItemHeight / animStart
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart
      }

      if (
        window.scrollY > animItemOffset - animItemPoint &&
        window.scrollY < animItemOffset + animItemHeight
      ) {
        // Время задержки анимации
        setTimeout(() => {
          animItem.classList.add("_active")
        }, 30)
      } else {
        // _anim-no-hide убирает анимацию появления по кругу c помощью CSS
        if (!animItem.classList.contains("_anim-no-hide")) {
          // Повторяет анимацию по кругу /  если она не нужна, убираем animItem.classList.remove('_active');
          // animItem.classList.remove('_active');
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
  // Активирует функцию без действия скролла (Чтобы анимация сработала сразу после загрузке страницы)
  animOnScroll()
}

/*=============== COUNTDOWN TIMER ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const date = new Date("Apr 1 2024 00:00:00")

  const daysVal = document.querySelector(".count-time__days .count-time__value")
  const hoursVal = document.querySelector(
    ".count-time__hours .count-time__value"
  )
  const minutesVal = document.querySelector(
    ".count-time__minutes .count-time__value"
  )
  const secondsVal = document.querySelector(
    ".count-time__seconds .count-time__value"
  )

  const daysText = document.querySelector(".count-time__days .count-time__text")
  const hoursText = document.querySelector(
    ".count-time__hours .count-time__text"
  )
  const minutesText = document.querySelector(
    ".count-time__minutes .count-time__text"
  )
  const secondsText = document.querySelector(
    ".count-time__seconds .count-time__text"
  )

  function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2]
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ]
  }

  const timeCount = () => {
    let now = new Date()
    let leftUntil = date - now

    if (leftUntil <= 0) {
      date.setDate(date.getDate() + 2)
      leftUntil = date - now
    }

    let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24)
    let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24
    let minutes = Math.floor(leftUntil / 1000 / 60) % 60
    let seconds = Math.floor(leftUntil / 1000) % 60

    days = days < 10 ? "0" + days : days
    hours = hours < 10 ? "0" + hours : hours
    minutes = minutes < 10 ? "0" + minutes : minutes
    seconds = seconds < 10 ? "0" + seconds : seconds

    daysVal.textContent = days
    hoursVal.textContent = hours
    minutesVal.textContent = minutes
    secondsVal.textContent = seconds

    daysText.textContent = declOfNum(days, ["Day", "Day", "Days"])
    hoursText.textContent = declOfNum(hours, ["Hour", "Hour", "Clock"])
    minutesText.textContent = declOfNum(minutes, [
      "Minute",
      "Minutes",
      "Minutes",
    ])
    secondsText.textContent = declOfNum(seconds, [
      "Second",
      "Seconds",
      "Seconds",
    ])
  }

  const animate = () => {
    timeCount()
    requestAnimationFrame(animate)
  }

  animate()
})
