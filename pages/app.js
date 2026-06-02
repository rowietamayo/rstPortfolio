const SUPABASE_BUCKET_URL = "https://jkpenfuvjsikletzganq.supabase.co/storage/v1/object/public/portfolio-assets/"

function showLoadingAndRedirect(url) {
  // Simple redirect if no specific loading UI is defined yet
  window.location.href = url;
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

  // Refactor scroll animations to use IntersectionObserver
  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("headerVisible");
      } else {
        entry.target.classList.remove("headerVisible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".header").forEach(header => {
    observer.observe(header);
  });
});

document
  .getElementById("contact-form")
  ?.addEventListener("submit", function (event) {
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
    const navbar = document.getElementById("navbar")
    if (navbar) {
      navbar.innerHTML = data
    }
  })

// service list
document.addEventListener("DOMContentLoaded", () => {
  const services = [
    {
      img: "code.svg",
      alt: "Website Development",
      text: "Website Development",
    },
    {
      img: "responsive.svg",
      alt: "Responsive Website Design",
      text: "Responsive Website Design",
    },
    {
      img: "design.svg",
      alt: "Branding and Graphic Design",
      text: "Branding and Graphic Design",
    },
  ]

  const serviceList = document.getElementById("service-list")

  if (serviceList) {
    services.forEach((service) => {
      const col = document.createElement("div")
      col.className = "col-md-4 col-12 pb-2"

      col.innerHTML = `
        <div class="image-container border rounded">
          <img
            src="${SUPABASE_BUCKET_URL}${service.img}"
            alt="${service.alt}"
            class="image img-fluid col-12 px-4 service-image"
          />
          <div class="overlay">
            <p>${service.text}</p>
          </div>
        </div>
      `

      serviceList.appendChild(col)
    })
  }
})

// project list

document.addEventListener("DOMContentLoaded", () => {

  const projects = [
    { src: "profile.mp4", alt: "profile", link: "https://rowimaytamayo.com"},
    { src: "OHARA.svg", alt: "ohara" },
    { src: "SCRBBLES.svg", alt: "scribbles" },
    { src: "tab.mp4", alt: "allblue", link: "https://allblue.rowimaytamayo.com"},
    { src: "movie.svg", alt: "movie" },
    { src: "goingmarry.mp4", alt: "goingmarry", link: "https://goingmarry.rowimaytamayo.com" },
    { src: "hq.svg", alt: "hq" }
  ]

  const projectContainer = document.getElementById("project-list")

  if (projectContainer) {
    projects.forEach((project) => {
      const col = document.createElement("div")
      col.className = "col-sm-6 col-md-4 col-lg-3 col-12 pb-3"

      const isVideo = project.src.endsWith(".mp4")
      const cacheBuster = "?v=2" // Increment this version number whenever you upload a new version of the file to Supabase to force a cache refresh!
      const mediaElement = isVideo
        ? `<video src="${SUPABASE_BUCKET_URL}${project.src}${cacheBuster}" class="proj img-fluid" loop muted playsinline></video>`
        : `<img src="${SUPABASE_BUCKET_URL}${project.src}${cacheBuster}" alt="${project.alt}" class="proj img-fluid" loading="lazy" fetchpriority="high" />`

      const linkStart = project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">` : ''
      const linkEnd = project.link ? `</a>` : ''

      col.innerHTML = `
        <div class="proj-container">
          ${linkStart}
            ${mediaElement}
          ${linkEnd}
        </div>
      `

      // Play video on hover, pause & reset when hover leaves
      if (isVideo) {
        const videoElement = col.querySelector("video")
        const container = col.querySelector(".proj-container")
        let playPromise

        // Seek to 0.5 seconds on metadata load to display a visible frame instead of a blank screen
        videoElement.addEventListener("loadedmetadata", () => {
          videoElement.currentTime = 0.5
        })

        container.addEventListener("mouseenter", () => {
          playPromise = videoElement.play()
        })

        container.addEventListener("mouseleave", () => {
          if (playPromise !== undefined) {
            playPromise.then(() => {
              videoElement.pause()
              videoElement.currentTime = 0.5 // Reset to the beautiful preview frame
            }).catch(() => {
              // Safely ignore fast mouseenter/mouseleave interruptions
            })
          } else {
            videoElement.pause()
            videoElement.currentTime = 0.5
          }
        })
      }

      projectContainer.appendChild(col)
    })
  }
})
