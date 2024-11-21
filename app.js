function showLoadingAndRedirect(targetPage) {
  window.location.href = "index.html"

  setTimeout(() => {
    window.location.href = targetPage
  }, 2000)
}

document.addEventListener("DOMContentLoaded", function () {
  const homeNav = document.querySelector("#home-nav")
  if (homeNav) {
    homeNav.addEventListener("click", function (event) {
      event.preventDefault()
      showLoadingAndRedirect("portfolio.html")
    })
  }

  const profileNav = document.querySelector("#profile-nav")
  if (profileNav) {
    profileNav.addEventListener("click", function (event) {
      event.preventDefault()
      showLoadingAndRedirect("profile.html")
    })
  }
})

function checkForVisibility() {
  var headers = document.querySelectorAll(".header")
  headers.forEach(function (header) {
    if (isElementInViewport(header)) {
      header.classList.add("headerVisible")
    } else {
      header.classList.remove("headerVisible")
    }
  })
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect()

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

if (window.addEventListener) {
  addEventListener("DOMContentLoaded", checkForVisibility, false)
  addEventListener("load", checkForVisibility, false)
  addEventListener("scroll", checkForVisibility, false)
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    const form = event.target
    const spinner = document.getElementById("spinner")
    const sendImage = document.getElementById("send")
    const submitButton = document.getElementById("submitButton")
    const successAlert = document.getElementById("successAlert")

    if (form.checkValidity()) {
      event.preventDefault()

      sendImage.style.display = "none"
      spinner.classList.remove("visually-hidden")
      submitButton.disabled = true

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            spinner.classList.add("visually-hidden")
            sendImage.style.display = "inline-block"
            successAlert.classList.remove("visually-hidden")

            form.reset()

            submitButton.disabled = false
          } else {
            throw new Error("Submission failed.")
          }
        })
        .catch((error) => {
          console.error(error)
          spinner.classList.add("visually-hidden")
          sendImage.style.display = "inline-block"
          submitButton.disabled = false
        })
    } else {
      event.preventDefault()
    }
  })

fetch("nav.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data
  })
