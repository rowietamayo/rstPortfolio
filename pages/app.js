const SUPABASE_BUCKET_URL =
  "https://jkpenfuvjsikletzganq.supabase.co/storage/v1/object/public/portfolio-assets/"

// Dynamic injection of the transition overlay
const overlay = document.createElement("div")
overlay.id = "page-transition-overlay"
overlay.className = "transition-overlay"
overlay.innerHTML = `<div class="transition-dot"></div>`

if (document.body) {
  document.body.prepend(overlay)
} else {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.prepend(overlay)
  })
}

// Slide the curtain up once the page has fully loaded
window.addEventListener("load", function () {
  // Small delay so the dot is briefly visible before the curtain lifts
  setTimeout(() => {
    overlay.classList.add("slide-out")
  }, 200)
})

// Safe fallback: slide out the overlay if the page takes too long to load
setTimeout(() => {
  if (!overlay.classList.contains("slide-out")) {
    overlay.classList.add("slide-out")
  }
}, 2000)

document.addEventListener("DOMContentLoaded", function () {
  // Page Transition Event Interception
  document.addEventListener("click", function (event) {
    const link = event.target.closest("a")
    if (!link) return

    const href = link.getAttribute("href")
    if (!href) return

    // Skip target="_blank", non-http links, and same-page anchor hashes
    if (
      link.target === "_blank" ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:") ||
      href.startsWith("#")
    ) {
      return
    }

    try {
      // Resolve absolute URL
      const targetUrl = new URL(href, window.location.href)

      // Only transition internal links of the same origin
      if (targetUrl.origin !== window.location.origin) {
        return
      }

      // Compare just the filename (last segment of the path)
      const currentFile = window.location.pathname.split("/").pop()
      const targetFile = targetUrl.pathname.split("/").pop()

      // If navigating to a different page file, trigger the curtain transition
      if (currentFile !== targetFile) {
        event.preventDefault()

        // Reset: remove slide-out so overlay is back at translateY(0)
        overlay.classList.remove("slide-out")
        // Force a reflow so the browser registers the position reset
        void overlay.offsetHeight
        // The overlay is now visible at translateY(0), covering the page

        setTimeout(() => {
          window.location.href = href
        }, 500) // matches CSS transition duration (0.5s)
      }
    } catch (e) {
      // Fallback: let standard navigation occur if URL parsing fails
    }
  })

  // Refactor scroll animations to use IntersectionObserver
  const observerOptions = {
    root: null,
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("headerVisible")
      } else {
        entry.target.classList.remove("headerVisible")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".header").forEach((header) => {
    observer.observe(header)
  })
})

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
    { src: "profile.mp4", alt: "profile", link: "https://rowimaytamayo.com" },
    { src: "ohara.mp4", alt: "ohara", link: "https://ohara.rowimaytamayo.com" },
    { src: "SCRBBLES.svg", alt: "scribbles" },
    {
      src: "tab.mp4",
      alt: "allblue",
      link: "https://allblue.rowimaytamayo.com",
    },
    { src: "movie.svg", alt: "movie" },
    {
      src: "goingmarry.mp4",
      alt: "goingmarry",
      link: "https://goingmarry.rowimaytamayo.com",
    },
    { src: "hq.svg", alt: "hq" },
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

      const linkStart = project.link
        ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer">`
        : ""
      const linkEnd = project.link ? `</a>` : ""

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
            playPromise
              .then(() => {
                videoElement.pause()
                videoElement.currentTime = 0.5 // Reset to the beautiful preview frame
              })
              .catch(() => {
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

//tech stack list
const techStacks = {
  programmingLanguages: [
    { name: "HTML", img: "html.svg" },
    { name: "CSS", img: "css.svg" },
    { name: "JavaScript", img: "javascript.svg" },
    { name: "Python", img: "python.svg" },
    { name: "TypeScript", img: "typescript.svg" },
    { name: "PHP", img: "php.svg" },
    { name: "SQL", img: "sql.svg" },
  ],

  frontEnd: [
    { name: "React", img: "react.svg" },
    { name: "Next.js", img: "nextjs.svg" },
    { name: "Bootstrap", img: "bootstrap.svg" },
    { name: "Tailwind", img: "tailwind.svg" },
  ],

  backEnd: [
    { name: "Node.js", img: "nodejs.svg" },
    { name: "Express.js", img: "expressjs.svg" },
    { name: "Django", img: "django.svg" },
    { name: "Laravel", img: "laravel.svg" },
  ],
  databaseAndCloud: [
    { name: "MySQL", img: "mysql.svg" },
    { name: "PostgreSQL", img: "postgresql.svg" },
    { name: "MongoDB", img: "mongodb.svg" },
    { name: "Supabase", img: "supabase.svg" },
    { name: "Neon", img: "neon.svg" },
    { name: "AWS", img: "aws.svg" },
    { name: "Cloudinary", img: "cloudinary.svg" },
    { name: "ImageKit", img: "imagekit.jpg" },
  ],

  toolsAndDevOps: [
    { name: "GitHub", img: "github.svg" },
    { name: "Git", img: "git.svg" },
    { name: "VS Code", img: "vscode.svg" },
    { name: "Figma", img: "figma.svg" },
    { name: "Vercel", img: "vercel.svg" },
    { name: "Docker", img: "docker.svg" },
    { name: "Render", img: "render.svg" },
    { name: "Mocha", img: "mocha.svg" },
    { name: "Chai", img: "chai.svg" },
  ],
}

function renderTools(category, targetId) {
  // Render a list of tools into a container element.
  const container =
    typeof targetId === "string" ? document.getElementById(targetId) : targetId
  if (!container) return

  techStacks[category].forEach((tool) => {
    const imgSrc = SUPABASE_BUCKET_URL + (tool.img || tool.imgSrc || "")
    const card = `
      <div class="col-6 col-sm-6 col-md-6 col-lg-4">
        <div class="card mb-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4 col-4 d-flex justify-content-center align-items-center card-image">
              <img src="${imgSrc}" alt="${tool.alt || tool.name + " logo"}" class="img-fluid justify-content-center tools-logo" loading="lazy" />
            </div>
            <div class="col-md-8 col-8">
              <div class="card-body">
                <p class="card-title text-center text-md-start pt-2">${tool.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`
    container.insertAdjacentHTML("beforeend", card)
  })
}

// Render all tech stack categories into either Bootstrap tab panes (if present)
// or into the single #techStacks element as a fallback.
window.onload = () => {
  const languagesPane = document.getElementById("languages")

  if (languagesPane) {
    const mapping = {
      languages: "programmingLanguages",
      frontEnd: "frontEnd",
      backEnd: "backEnd",
      databaseAndCloud: "databaseAndCloud",
      toolsAndDevOps: "toolsAndDevOps",
    }

    Object.entries(mapping).forEach(([tabKey, categoryKey]) => {
      const row = document.getElementById(`${tabKey}-stack`)
      if (!row) return
      if (!techStacks[categoryKey]) return

      renderTools(categoryKey, row)
    })

    return
  }

  // Fallback: render into #techStacks
  const wrapper = document.getElementById("techStacks")
  if (!wrapper) return

  Object.entries(techStacks).forEach(([categoryKey, tools]) => {
    const section = document.createElement("div")
    section.className = "tech-category container py-3"

    const title = document.createElement("h2")
    title.className = "h5 text-start text-uppercase"
    title.textContent = categoryKey
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase())

    section.appendChild(title)

    const row = document.createElement("div")
    row.className = "row"

    section.appendChild(row)
    wrapper.appendChild(section)

    renderTools(categoryKey, row)
  })
}
