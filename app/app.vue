<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isNavScrolled = ref(false)
const activeSection = ref('home')
const isSendingMessage = ref(false)
const contactStatus = ref('')
const contactStatusType = ref<'success' | 'error' | ''>('')
const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})
let revealObserver: IntersectionObserver | null = null
let projectObserver: IntersectionObserver | null = null

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const updateNavState = () => {
  isNavScrolled.value = window.scrollY > 8

  const activationLine = window.innerHeight * 0.34
  const current = navItems
    .map((item) => item.toLowerCase())
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => Boolean(section))
    .find((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top <= activationLine && rect.bottom > activationLine
    })

  if (current) {
    activeSection.value = current.id
  }
}

onMounted(() => {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

  updateNavState()
  window.addEventListener('scroll', updateNavState, { passive: true })

  const revealItems = document.querySelectorAll<HTMLElement>('.reveal-on-scroll')
  const projectItems = document.querySelectorAll<HTMLElement>('.project-item')
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach((item) => item.classList.add('is-visible'))
    projectItems.forEach((item) => item.classList.add('is-project-visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    {
      rootMargin: '0px',
      threshold: 0.3,
    },
  )

  revealItems.forEach((item) => revealObserver?.observe(item))

  projectObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('is-project-visible')
        observer.unobserve(entry.target)
      })
    },
    {
      rootMargin: '0px',
      threshold: 0.3,
    },
  )

  projectItems.forEach((item) => projectObserver?.observe(item))
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateNavState)
  revealObserver?.disconnect()
  projectObserver?.disconnect()
})

const submitContactForm = async () => {
  if (isSendingMessage.value) return

  contactStatus.value = ''
  contactStatusType.value = ''

  if (
    EMAILJS_SERVICE_ID.startsWith('YOUR_') ||
    EMAILJS_TEMPLATE_ID.startsWith('YOUR_') ||
    EMAILJS_PUBLIC_KEY.startsWith('YOUR_')
  ) {
    contactStatus.value = 'EmailJS is not configured yet. Please add your service ID, template ID, and public key.'
    contactStatusType.value = 'error'
    return
  }

  isSendingMessage.value = true

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: contactForm.value.name,
          from_email: contactForm.value.email,
          subject: contactForm.value.subject || 'Portfolio contact form',
          message: contactForm.value.message,
          to_email: 'hafizh.irfansyah41@gmail.com',
        },
      }),
    })

    if (!response.ok) {
      throw new Error('EmailJS request failed')
    }

    contactStatus.value = 'Your message has been sent successfully.'
    contactStatusType.value = 'success'
    contactForm.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
    }
  } catch {
    contactStatus.value = 'Sorry, your message could not be sent. Please try again or email me directly.'
    contactStatusType.value = 'error'
  } finally {
    isSendingMessage.value = false
  }
}

const navItems = ['Home', 'About', 'Project', 'Contact']

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'My Expertise', href: '#expertise' },
  { label: 'Projects', href: '#project' },
  { label: 'FAQ', href: '#faq' },
]

const expertise = [
  {
    icon: 'language',
    title: 'Web Development',
    text: 'I build responsive web applications using JavaScript, Vue.js, and Laravel. I prioritize writing clean, custom code structures for full control over the layout and functionality, avoiding heavy reliance on pre-built templates.',
  },
  {
    icon: 'conversion_path',
    title: 'UI/UX Design',
    text: 'Applying Human-Centered Design methodologies, I create intuitive user interfaces and wireframes using tools like Figma and Adobe Photoshop.',
  },
  {
    icon: 'draw',
    title: 'Graphic Design',
    text: 'I design compelling visual materials for promotional needs, including brochures, banners, and layouts for marketing, ensuring effective visual communication.',
  },
  {
    icon: 'desktop_windows',
    title: 'Video Editing',
    text: 'I produce dynamic promotional and profile videos using Adobe Premiere Pro and Adobe After Effects for engaging visual transitions.',
  },
]

const projects = [
  {
    title: 'Roti Alit',
    type: 'E-Commerce • Website',
    accent: '#22b8b2',
    image: '/roti%20alit.png',
  },
  {
    title: 'MOOC Unocos',
    type: 'Education Platform • UI/UX Design',
    accent: '#3f5cff',
    image: '/unocos.png',
  },
  {
    title: 'Kampung Bebek',
    type: 'Community Profile • Website',
    accent: '#e5a33b',
    image: '/kampung%20bebek.png',
  },
]

const faqs = [
  {
    question: 'What design and development services do you offer?',
    answer:
      'I offer a comprehensive range of digital services. On the development side, I build responsive, full-stack web applications using frameworks like Laravel and Vue.js. On the design side, I provide UI/UX design, graphic design for branding and promotional materials, and video editing.',
  },
  {
    question: 'How does your design and development process typically work?',
    answer:
      'My process starts with understanding the core problem. For UI/UX, I utilize the Human-Centered Design approach to ensure the interface is highly intuitive for the end-user. When it comes to web development, I strongly prefer writing custom code and crafting utility classes from scratch rather than relying on restrictive visual page builders. This ensures absolute control over the HTML structure, better performance, and scalability.',
  },
  {
    question: 'Are you open to collaboration or part-time work?',
    answer:
      'While I am currently committed to a full-time contract as an IT Programmer, I am actively open to taking on freelance projects, part-time remote collaborations, or independent development work outside of my regular office hours.',
  },
  {
    question: 'How long does it typically take to complete a project?',
    answer:
      "The timeline varies significantly depending on the project's scope and complexity. A front-end landing page might take a couple of weeks, while a complex full-stack dashboard or a comprehensive e-commerce platform will take longer. We will establish a clear timeline and milestones during our initial discussion.",
  },
  {
    question: 'How do I start a project with you?',
    answer:
      'You can easily reach out to me via email at hafizh.irfansyah41@gmail.com or connect with me on LinkedIn. Just share a brief overview of your project goals, requirements, and timeline, and we can schedule a chat to discuss how we can bring your ideas to life.',
  },
]
</script>

<template>
  <main class="site-shell">
    <header class="floating-nav" :class="{ 'floating-nav-scrolled': isNavScrolled }">
      <a class="brand-mark" href="#home" aria-label="Hafizh Irfansyah home">
        <img src="/HMI%20Ungu.png" alt="HMI" />
      </a>
      <nav aria-label="Primary navigation">
        <a
          v-for="item in navItems"
          :key="item"
          :class="{ 'nav-link-active': activeSection === item.toLowerCase() }"
          :href="`#${item.toLowerCase()}`"
        >
          {{ item }}
        </a>
      </nav>
    </header>

    <section id="home" class="hero-section reveal-on-scroll">
      <div class="hero-copy hero-copy-left">
        <p>Hello, I'm Irfan, a Web Developer and Designer based in Surabaya, Indonesia.</p>
        <details class="cv-dropdown">
          <summary class="download-cv-button">
            <span class="material-symbols-rounded" aria-hidden="true">download</span>
            Download CV
            <span class="material-symbols-rounded cv-chevron" aria-hidden="true">expand_more</span>
          </summary>
          <div class="cv-dropdown-menu">
            <a href="/CV_Hafizh%20_Irfansyah.pdf" download>CV Bahasa Indonesia</a>
            <a href="/CV_Hafizh_Muhammad_Irfansyah_English%20Version.pdf" download>CV English Version</a>
          </div>
        </details>
      </div>

      <div class="hero-portrait" aria-label="Portrait of Hafizh Irfansyah">
        <img class="hero-photo" src="/foto-utama.png" alt="Hafizh Muhammad Irfansyah" />
        <span class="role-badge badge-web">Web Developer</span>
        <span class="role-badge badge-ui">UI/UX Designer</span>
        <span class="role-badge badge-graphic">Graphic Designer</span>
      </div>

      <div class="hero-copy hero-copy-right">
        I blend structured code with engaging visual design to build impactful digital solutions.
      </div>
    </section>

    <section id="about" class="about-section content-grid reveal-on-scroll">
      <div class="section-heading">
        <p class="eyebrow">About Me</p>
        <h1>A Deep Dive into My Journey of Uniting Visual Aesthetics and System Architecture</h1>
      </div>

      <div class="about-visual">
        <img src="/foto%20about%20me.png" alt="Portrait of Hafizh Muhammad Irfansyah" />
      </div>

      <div class="about-text">
        <p>
          Hello, I'm Hafizh Muhammad Irfansyah, a Web Developer and Designer based in Surabaya, East Java.
          As an Information Systems graduate from Telkom University Surabaya, I have a deep interest in
          designing user interfaces and developing interactive web applications using technologies such
          as JavaScript, Vue.js, and Laravel. My career journey is filled with dynamic collaborations and
          projects, ranging from designing commercial visual communication materials to building complex
          systems like a Hospital Management Information System (SIMRS)
        </p>
        <p>
          Each of these experiences has not only honed my technical skills but also deepened my
          understanding of how to effectively combine data, design, and functionality. I believe that a
          great digital solution is not just about looking aesthetically pleasing; it must solve problems
          and create a positive impact for its users. As an analytical, creative, and collaborative
          individual, I am always highly motivated to keep learning and creating new innovations in every
          line of code and design I produce.
        </p>
      </div>
    </section>

    <section id="expertise" class="expertise-section reveal-on-scroll">
      <div class="expertise-intro">
        <div>
          <p class="eyebrow">My Expertise</p>
          <h2>I Have the Expertise to Build Comprehensive Digital Solutions</h2>
        </div>
        <p>
          With a diverse background spanning both design and system development, I can tackle challenges
          from multiple technical angles. My ability to bridge the gap between visual aesthetics and
          robust backend architecture makes me a versatile asset to any project.
        </p>
      </div>

      <div class="expertise-cards">
        <article
          v-for="(item, index) in expertise"
          :key="item.title"
          class="expertise-card"
          :style="{ '--expertise-delay': `${index * 120}ms` }"
        >
          <span class="material-symbols-rounded icon-bubble" aria-hidden="true">{{ item.icon }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section id="project" class="projects-section reveal-on-scroll">
      <img class="project-ornament project-ornament-left" src="/ornamen%20atas%20kiri.png" alt="" aria-hidden="true" />
      <img class="project-ornament project-ornament-right" src="/ornamen%20atas%20kanan.png" alt="" aria-hidden="true" />
      <div class="projects-inner">
        <div class="projects-top">
          <div>
            <h2>My Best Projects</h2>
            <p>
              Whether it's designing an intuitive user interface, developing a responsive web application,
              or creating engaging multimedia content, I strive to build digital solutions that are both
              highly functional and visually impactful.
            </p>
          </div>
          <a class="outline-button" href="#contact" aria-label="See more works">
            See More Works
            <span class="material-symbols-rounded" aria-hidden="true">arrow_forward</span>
          </a>
        </div>

        <div class="project-list">
          <article
            v-for="(project, index) in projects"
            :key="`${project.title}-${project.type}`"
            class="project-item"
            :style="{ '--project-delay': `${index * 170}ms` }"
          >
            <h3>{{ project.title }}</h3>
            <p>{{ project.type }}</p>
            <div class="project-preview" :style="{ '--accent': project.accent }">
              <img :src="project.image" :alt="`${project.title} project preview`" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="faq" class="faq-section reveal-on-scroll">
      <div class="faq-copy">
        <h2>Frequently Asked Questions</h2>
        <p>
          Here are some common questions along with their answers to help clear up any confusion about my
          services and workflow.
        </p>
      </div>
      <div class="faq-list">
        <details
          v-for="(faq, index) in faqs"
          :key="faq.question"
          :style="{ '--faq-delay': `${index * 120}ms` }"
        >
          <summary>{{ faq.question }}</summary>
          <p>{{ faq.answer }}</p>
        </details>
      </div>
    </section>

    <section id="contact" class="contact-section content-grid reveal-on-scroll">
      <div class="contact-copy">
        <h2>Let's Connect</h2>
        <p>
          Feel free to reach out if you are looking for a developer, have a project in mind, or just want
          to connect. I'm always open to discussing new web development or design opportunities.
        </p>

        <div class="contact-lines">
          <a href="mailto:hafizh.irfansyah41@gmail.com">
            <span class="material-symbols-rounded contact-icon" aria-hidden="true">mail</span>
            hafizh.irfansyah41@gmail.com
          </a>
          <span>
            <span class="material-symbols-rounded contact-icon" aria-hidden="true">location_on</span>
            Surabaya, East Java, Indonesia
          </span>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="submitContactForm">
        <label>
          <span>Your Name <sup>*</sup></span>
          <input v-model="contactForm.name" type="text" name="name" placeholder="Insert your name" required />
        </label>
        <label>
          <span>Your Email <sup>*</sup></span>
          <input v-model="contactForm.email" type="email" name="email" placeholder="Insert your email" required />
        </label>
        <label>
          <span>Subject</span>
          <input v-model="contactForm.subject" type="text" name="subject" placeholder="Insert your subject" />
        </label>
        <label>
          <span>Your Message <sup>*</sup></span>
          <textarea v-model="contactForm.message" name="message" placeholder="Insert your message" required />
        </label>
        <button type="submit" :disabled="isSendingMessage">
          {{ isSendingMessage ? 'Sending...' : 'Submit' }}
        </button>
        <p
          v-if="contactStatus"
          class="contact-status"
          :class="`contact-status-${contactStatusType}`"
          role="status"
        >
          {{ contactStatus }}
        </p>
      </form>
    </section>

    <footer class="site-footer reveal-on-scroll">
      <div class="footer-brand">
        <a class="footer-logo-link" href="#home" aria-label="Hafizh Irfansyah home">
          <img class="footer-logo" src="/HMI%20Putih.png" alt="HMI" />
        </a>
        <p>
          <span class="material-symbols-rounded copyright-symbol" aria-hidden="true">copyright</span>
          2026 Hafizh Muhammad Irfansyah. All rights reserved.
        </p>
      </div>

      <div class="footer-links">
        <h3>Quick Links</h3>
        <a v-for="item in quickLinks" :key="item.label" :href="item.href">{{ item.label }}</a>
      </div>

      <div class="footer-contact">
        <h3>Get in Touch</h3>
        <a href="mailto:hafizh.irfansyah41@gmail.com">
          <span class="material-symbols-rounded" aria-hidden="true">mail</span>
          : hafizh.irfansyah41@gmail.com
        </a>
        <a href="tel:+6287852843203">
          <span class="material-symbols-rounded" aria-hidden="true">call</span>
          : +62 878 5284 3203
        </a>
        <h3>Socials</h3>
        <div class="socials">
          <a href="https://www.linkedin.com/in/hfizh-irfansyah" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          <a href="https://github.com/hfizhirfan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.86 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.64-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.97c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.8-4.56 5.06.36.32.68.94.68 1.9v2.78c0 .27.18.59.69.49A10.22 10.22 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400..700,0..1,-50..200');

:root {
  --ink: #1f2229;
  --muted: #626873;
  --blue: #465dff;
  --blue-soft: #bac5ff;
  --paper: #f7f7f5;
  --panel: #ffffff;
  --dark: #252b34;
  interpolate-size: allow-keywords;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

section[id] {
  scroll-margin-top: 110px;
}

#contact {
  scroll-margin-top: 150px;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Google Sans", "Product Sans", Arial, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  letter-spacing: 0;
}

.material-symbols-rounded {
  direction: ltr;
  display: inline-flex;
  font-family: "Material Symbols Rounded";
  font-feature-settings: "liga";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1;
  text-transform: none;
  white-space: nowrap;
  word-wrap: normal;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

.site-shell {
  min-height: 100vh;
  overflow: hidden;
}

.reveal-on-scroll {
  opacity: 0;
  transform: translateY(34px);
  transition: opacity 700ms ease, transform 700ms ease;
  will-change: opacity, transform;
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .faq-section details {
    opacity: 1;
    transform: none;
  }

  .faq-section.is-visible details {
    transition: background-color 220ms ease, border-color 220ms ease, color 220ms ease;
  }

  .contact-copy h2,
  .contact-copy > p,
  .contact-lines > a,
  .contact-lines > span,
  .contact-form label,
  .contact-form button {
    opacity: 1;
    transform: none;
  }

  .contact-section.is-visible .contact-copy h2,
  .contact-section.is-visible .contact-copy > p,
  .contact-section.is-visible .contact-lines > a,
  .contact-section.is-visible .contact-lines > span,
  .contact-section.is-visible .contact-form label,
  .contact-section.is-visible .contact-form button {
    transition: none;
  }

  .expertise-card {
    opacity: 1;
    transform: none;
  }

  .expertise-section.is-visible .expertise-card {
    transition: none;
  }

  .about-section .eyebrow,
  .about-section h1,
  .about-visual,
  .about-text p {
    opacity: 1;
    transform: none;
  }

  .about-section.is-visible .eyebrow,
  .about-section.is-visible h1,
  .about-section.is-visible .about-visual,
  .about-section.is-visible .about-text p {
    transition: none;
  }
}

.floating-nav {
  position: fixed;
  z-index: 20;
  top: 32px;
  left: 50%;
  width: min(1320px, calc(100% - 96px));
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(54px, 9vw, 142px);
  background: transparent;
  border-radius: 62px;
  box-shadow: none;
  transform: translateX(-50%);
  transition: background 180ms ease, box-shadow 180ms ease, backdrop-filter 180ms ease;
}

.floating-nav-scrolled {
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 22px 22px 28px rgba(18, 20, 25, 0.28);
  backdrop-filter: blur(16px);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 64px;
}

.brand-mark img {
  display: block;
  width: 34px;
  height: auto;
  object-fit: contain;
}

.floating-nav nav {
  display: flex;
  align-items: center;
  gap: clamp(52px, 6vw, 86px);
  color: #252525;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
}

.floating-nav nav a {
  position: relative;
  padding-bottom: 10px;
  transition: color 160ms ease;
}

.floating-nav nav a:hover {
  color: var(--blue);
}

.floating-nav nav a::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 22px;
  height: 3px;
  margin: 0 auto;
  border-radius: 999px;
  background: var(--blue);
  content: "";
  opacity: 0;
  transform: scaleX(0.55);
  transition: opacity 160ms ease, transform 160ms ease;
}

.floating-nav nav a.nav-link-active {
  color: var(--blue);
}

.floating-nav nav a.nav-link-active::after {
  opacity: 1;
  transform: scaleX(1);
}

.hero-section {
  min-height: 620px;
  position: relative;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(360px, 500px) minmax(280px, 1fr);
  align-items: end;
  gap: clamp(44px, 6vw, 96px);
  padding: 160px min(6vw, 112px) 0;
  background:
    linear-gradient(0deg, #c2ccff 0%, #eaf0ff 9%, transparent 18%, transparent 100%),
    linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
}

.hero-copy {
  align-self: center;
  max-width: 520px;
  color: #24262b;
  font-size: 21px;
  font-weight: 500;
  line-height: 1.28;
}

.hero-copy p {
  margin-bottom: 28px;
}

.cv-dropdown {
  position: relative;
  display: inline-block;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  opacity: 1;
  transform: none;
  transition: none;
}

.cv-dropdown::details-content {
  block-size: auto;
  overflow: visible;
}

.cv-dropdown[open] {
  border-color: transparent;
  background: transparent;
  color: inherit;
}

.download-cv-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid #242933;
  border-radius: 999px;
  background: #242933;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  list-style: none;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}

.download-cv-button::-webkit-details-marker {
  display: none;
}

.download-cv-button:hover,
.download-cv-button:focus-visible {
  border-color: var(--blue);
  background: var(--blue);
}

.download-cv-button .material-symbols-rounded {
  font-size: 20px;
  font-variation-settings: "FILL" 0, "wght" 600, "GRAD" 0, "opsz" 20;
}

.download-cv-button .cv-chevron {
  font-size: 22px;
  transition: transform 160ms ease;
}

.cv-dropdown[open] .cv-chevron {
  transform: rotate(180deg);
}

.cv-dropdown-menu {
  position: absolute;
  z-index: 12;
  top: calc(100% + 10px);
  left: 0;
  display: grid;
  min-width: 220px;
  padding: 8px;
  border: 1px solid #dfe1e4;
  border-radius: 12px;
  background: white;
  box-shadow: 0 18px 34px rgba(24, 28, 36, 0.14);
}

.cv-dropdown-menu a {
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  color: #242933;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  transition: background-color 160ms ease, color 160ms ease;
}

.cv-dropdown-menu a:hover,
.cv-dropdown-menu a:focus-visible {
  background: #eef1ff;
  color: var(--blue);
}

.hero-copy-left {
  justify-self: end;
}

.hero-copy-right {
  justify-self: start;
  max-width: 560px;
  text-align: center;
}

.hero-portrait {
  position: relative;
  height: 460px;
  display: grid;
  place-items: end center;
}

.hero-photo {
  position: relative;
  z-index: 2;
  width: min(470px, 100%);
  height: auto;
  object-fit: contain;
  object-position: center bottom;
  border-radius: 0;
  filter: drop-shadow(0 20px 22px rgba(24, 28, 36, 0.18));
}

.person {
  position: relative;
  width: 220px;
  height: 328px;
  z-index: 2;
}

.head {
  position: absolute;
  top: 0;
  left: 70px;
  width: 96px;
  height: 116px;
  border-radius: 48% 46% 44% 46%;
  background: #d69b75;
  transform: rotate(-8deg);
  box-shadow: inset -12px 0 0 rgba(132, 78, 52, 0.16);
}

.hair {
  position: absolute;
  top: -3px;
  left: -7px;
  width: 102px;
  height: 48px;
  border-radius: 48px 50px 16px 24px;
  background: #1d2025;
  transform: rotate(-5deg);
}

.ear {
  position: absolute;
  right: -8px;
  top: 52px;
  width: 16px;
  height: 24px;
  border-radius: 50%;
  background: #cc8f6c;
}

.neck {
  position: absolute;
  top: 104px;
  left: 98px;
  width: 38px;
  height: 42px;
  background: #c98b68;
}

.shirt {
  position: absolute;
  bottom: 0;
  left: 12px;
  width: 196px;
  height: 220px;
  border-radius: 52px 52px 8px 8px;
  background: linear-gradient(95deg, #17191f, #262934);
  clip-path: polygon(24% 0, 74% 0, 100% 100%, 0 100%);
}

.shirt::before {
  position: absolute;
  content: "";
  top: 0;
  left: 72px;
  width: 52px;
  height: 26px;
  border-radius: 0 0 40px 40px;
  background: #b77a5b;
}

.shirt-fold {
  position: absolute;
  top: 68px;
  width: 1px;
  height: 118px;
  background: rgba(255, 255, 255, 0.13);
}

.shirt-fold-left {
  left: 62px;
  transform: rotate(8deg);
}

.shirt-fold-right {
  right: 58px;
  transform: rotate(-8deg);
}

.role-badge {
  position: absolute;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0 25px;
  border-radius: 999px;
  background: var(--blue);
  color: white;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 0 18px 34px rgba(70, 93, 255, 0.28);
  animation: role-float 4.8s ease-in-out infinite;
  will-change: transform;
}

.badge-web {
  left: 6px;
  top: 280px;
  animation-delay: 0s;
}

.badge-ui {
  right: -8px;
  top: 220px;
  animation-delay: -1.4s;
}

.badge-graphic {
  right: 82px;
  bottom: 84px;
  background: #2844bf;
  animation-delay: -2.7s;
}

@keyframes role-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -10px, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .role-badge {
    animation: none;
  }

  .project-item {
    opacity: 1;
    transform: none;
  }

  .project-item.is-project-visible {
    transition: none;
  }
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) minmax(260px, 1.2fr);
  gap: clamp(48px, 10vw, 140px);
  width: min(1060px, calc(100% - 72px));
  margin: 0 auto;
}

.about-section {
  width: min(1296px, calc(100% - 136px));
  row-gap: 34px;
  column-gap: clamp(72px, 12vw, 190px);
  padding: 84px 0 124px;
  grid-template-areas:
    "heading visual"
    ". text";
  grid-template-columns: minmax(420px, 0.78fr) minmax(420px, 1fr);
  align-items: start;
}

.section-heading {
  grid-area: heading;
}

.about-section .eyebrow {
  margin-bottom: 28px;
  color: #24262b;
  font-size: 22px;
  font-weight: 800;
  line-height: 1;
}

.about-section h1 {
  max-width: 560px;
  color: #24262b;
  font-size: 42px;
  line-height: 1.18;
}

.about-section .eyebrow,
.about-section h1,
.about-visual,
.about-text p {
  opacity: 0;
  transform: translateY(30px);
}

.about-section.is-visible .eyebrow,
.about-section.is-visible h1,
.about-section.is-visible .about-visual,
.about-section.is-visible .about-text p {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 650ms ease, transform 650ms ease;
}

.about-section.is-visible .eyebrow {
  transition-delay: 0ms;
}

.about-section.is-visible h1 {
  transition-delay: 120ms;
}

.about-section.is-visible .about-visual {
  transition-delay: 240ms;
}

.about-section.is-visible .about-text p:nth-child(1) {
  transition-delay: 360ms;
}

.about-section.is-visible .about-text p:nth-child(2) {
  transition-delay: 480ms;
}

.eyebrow {
  margin: 0 0 24px;
  color: #0c0e13;
  font-size: 17px;
  font-weight: 800;
  text-transform: capitalize;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2 {
  font-size: clamp(32px, 4vw, 46px);
  line-height: 1.08;
  letter-spacing: 0;
}

.about-visual {
  grid-area: visual;
  justify-self: end;
  padding-top: 4px;
}

.about-visual img {
  display: block;
  width: 252px;
  aspect-ratio: 252 / 304;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
}

.about-text {
  grid-area: text;
  max-width: 630px;
  margin-top: 0;
  color: #626873;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.35;
}

.about-text p + p {
  margin-top: 34px;
}

.expertise-section {
  width: min(1296px, calc(100% - 136px));
  margin: 0 auto;
  padding: 72px 0 112px;
}

.expertise-intro {
  display: grid;
  grid-template-columns: minmax(360px, 0.78fr) minmax(520px, 1fr);
  gap: clamp(76px, 10vw, 150px);
  align-items: start;
}

.expertise-intro .eyebrow {
  margin-bottom: 26px;
  color: #24262b;
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
}

.expertise-intro h2 {
  max-width: 520px;
  font-size: 36px;
  line-height: 1.18;
}

.expertise-intro > p {
  max-width: 700px;
  padding-top: 52px;
  color: #626873;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.22;
}

.expertise-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-top: 86px;
}

.expertise-card {
  min-height: 300px;
  padding: 24px 28px 20px;
  background: #f4f4f4;
  border-radius: 24px;
  opacity: 0;
  transform: translateY(30px);
}

.expertise-section.is-visible .expertise-card {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 620ms ease var(--expertise-delay), transform 620ms ease var(--expertise-delay);
}

.icon-bubble {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  margin-bottom: 78px;
  border-radius: 50%;
  background: var(--blue);
  color: white;
  font-size: 26px;
  font-variation-settings: "FILL" 0, "wght" 600, "GRAD" 0, "opsz" 24;
}

.expertise-card h3 {
  margin-bottom: 24px;
  color: #24262b;
  font-size: 16px;
  line-height: 1.15;
}

.expertise-card p {
  margin: 0;
  color: #666b73;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.28;
}

.projects-section {
  position: relative;
  margin-top: 0;
  overflow: hidden;
  background: #242933;
  color: white;
}

.project-ornament {
  position: absolute;
  top: 0;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}

.project-ornament-left {
  left: 0;
  width: min(18.35vw, 264px);
}

.project-ornament-right {
  right: 0;
  width: min(15.18vw, 222px);
}

.projects-inner {
  position: relative;
  z-index: 1;
  width: min(1296px, calc(100% - 176px));
  margin: 0 auto;
  padding: 54px 0 0;
}

.projects-top {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 56px;
}

.projects-top h2 {
  margin-bottom: 52px;
  font-size: 50px;
}

.projects-top p {
  max-width: 430px;
  color: #d9dce3;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.35;
}

.outline-button {
  display: inline-flex;
  align-items: center;
  gap: 22px;
  min-height: 62px;
  margin-top: 88px;
  padding: 0 20px 0 25px;
  border: 1px solid white;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.outline-button span {
  display: grid;
  place-items: center;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  border: 1px solid white;
  font-size: 22px;
  font-variation-settings: "FILL" 0, "wght" 500, "GRAD" 0, "opsz" 20;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  margin-top: 96px;
}

.project-item {
  opacity: 0;
  transform: translateY(34px);
}

.project-item.is-project-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 650ms ease var(--project-delay), transform 650ms ease var(--project-delay);
}

.project-item h3 {
  margin-bottom: 12px;
  font-size: 16px;
  line-height: 1.15;
}

.project-item > p {
  margin-bottom: 22px;
  color: #d1d4dc;
  font-size: 16px;
  line-height: 1.25;
}

.project-preview {
  height: auto;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.project-preview img {
  display: block;
  width: 100%;
  height: auto;
  min-height: 0;
  object-fit: contain;
  object-position: top center;
}

.faq-section {
  display: grid;
  grid-template-columns: minmax(360px, 0.62fr) minmax(620px, 1fr);
  gap: clamp(72px, 10vw, 150px);
  width: min(1296px, calc(100% - 176px));
  margin: 0 auto;
  padding: 82px 0 136px;
}

.faq-copy h2 {
  max-width: 520px;
  margin-bottom: 46px;
  font-size: 36px;
  line-height: 1.08;
}

.contact-copy h2 {
  max-width: 360px;
  margin-bottom: 42px;
  font-size: 36px;
}

.faq-copy p {
  max-width: 540px;
  color: #626873;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.18;
}

.contact-copy p {
  max-width: 360px;
  color: #4f5662;
  font-size: 14px;
  line-height: 1.42;
}

.faq-list {
  display: grid;
  gap: 34px;
}

details {
  overflow: hidden;
  border: 1px solid #dfe1e4;
  border-radius: 18px;
  background: transparent;
  color: #24262b;
  opacity: 0;
  transform: translateY(28px);
  transition: background-color 220ms ease, border-color 220ms ease, color 220ms ease;
}

.faq-section.is-visible details {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 620ms ease var(--faq-delay),
    transform 620ms ease var(--faq-delay),
    background-color 220ms ease,
    border-color 220ms ease,
    color 220ms ease;
}

details::details-content {
  block-size: 0;
  overflow: hidden;
  transition: block-size 260ms ease, content-visibility 260ms ease allow-discrete;
}

details[open] {
  border-color: #242933;
  background: #242933;
  color: white;
}

details[open]::details-content {
  block-size: auto;
}

summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 68px;
  padding: 0 30px;
  cursor: pointer;
  color: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.15;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: "expand_more";
  font-family: "Material Symbols Rounded";
  font-feature-settings: "liga";
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  display: inline-grid;
  place-items: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 1;
  transition: transform 220ms ease;
  font-variation-settings: "FILL" 0, "wght" 600, "GRAD" 0, "opsz" 40;
}

.cv-dropdown summary::after {
  content: none;
}

.cv-dropdown,
.faq-section.is-visible .cv-dropdown {
  opacity: 1;
  transform: none;
  transition: none;
}

.cv-dropdown[open] {
  border-color: transparent;
  background: transparent;
  color: inherit;
}

details[open] summary::after {
  transform: rotate(180deg);
}

details p {
  margin: 0;
  padding: 0 30px 26px;
  color: inherit;
  font-size: 16px;
  line-height: 1.55;
  opacity: 0.72;
  transition: color 220ms ease, opacity 220ms ease;
}

details[open] p {
  opacity: 1;
}

.contact-section {
  grid-template-columns: minmax(360px, 0.9fr) minmax(440px, 1fr);
  align-items: start;
  width: min(1296px, calc(100% - 176px));
  gap: clamp(80px, 14vw, 210px);
  padding: 0 0 72px;
}

.contact-copy {
  padding-top: 4px;
}

.contact-copy h2,
.contact-copy > p,
.contact-lines > a,
.contact-lines > span,
.contact-form label,
.contact-form button {
  opacity: 0;
  transform: translateY(26px);
}

.contact-section.is-visible .contact-copy h2,
.contact-section.is-visible .contact-copy > p,
.contact-section.is-visible .contact-lines > a,
.contact-section.is-visible .contact-lines > span,
.contact-section.is-visible .contact-form label,
.contact-section.is-visible .contact-form button {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 620ms ease, transform 620ms ease;
}

.contact-section.is-visible .contact-copy h2 {
  transition-delay: 0ms;
}

.contact-section.is-visible .contact-copy > p {
  transition-delay: 120ms;
}

.contact-section.is-visible .contact-lines > a {
  transition-delay: 240ms;
}

.contact-section.is-visible .contact-lines > span {
  transition-delay: 360ms;
}

.contact-section.is-visible .contact-form label:nth-child(1) {
  transition-delay: 120ms;
}

.contact-section.is-visible .contact-form label:nth-child(2) {
  transition-delay: 240ms;
}

.contact-section.is-visible .contact-form label:nth-child(3) {
  transition-delay: 360ms;
}

.contact-section.is-visible .contact-form label:nth-child(4) {
  transition-delay: 480ms;
}

.contact-section.is-visible .contact-form button {
  transition-delay: 600ms;
}

.contact-lines {
  display: grid;
  gap: 28px;
  margin-top: 104px;
  font-size: 16px;
  font-weight: 700;
}

.contact-lines a,
.contact-lines span {
  display: inline-flex;
  align-items: center;
  gap: 28px;
}

.contact-icon {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  color: #11141a;
  font-size: 22px;
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 28;
}

.contact-form {
  display: grid;
  gap: 32px;
}

.contact-form label {
  display: grid;
  gap: 13px;
  color: #171a20;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.15;
}

sup {
  color: #ff4a4a;
  font-size: 0.9em;
  line-height: 0;
  vertical-align: baseline;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  border: 1px solid #c3c5c8;
  border-radius: 9px;
  background: transparent;
  padding: 0 12px;
  color: #171a20;
  outline: none;
  font-size: 12px;
  font-weight: 400;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.contact-form input {
  height: 39px;
}

.contact-form textarea {
  min-height: 111px;
  padding-top: 13px;
  resize: vertical;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #71757d;
  opacity: 1;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #5f6570;
  box-shadow: 0 0 0 3px rgba(31, 34, 41, 0.08);
}

.contact-form button {
  justify-self: start;
  min-width: 113px;
  min-height: 50px;
  border: 1.5px solid #12151b;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  color: #252933;
  font-size: 16px;
  font-weight: 700;
}

.contact-form button:disabled {
  cursor: wait;
  opacity: 0.58;
}

.contact-status {
  margin: -10px 0 0;
  max-width: 460px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
}

.contact-status-success {
  color: #247a4b;
}

.contact-status-error {
  color: #b84040;
}

.site-footer {
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(160px, 0.28fr) minmax(300px, 0.5fr);
  gap: clamp(56px, 8vw, 120px);
  min-height: 282px;
  padding: 42px max(58px, calc((100vw - 1440px) / 2 + 84px)) 48px;
  background: var(--dark);
  color: white;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-height: 190px;
}

.footer-logo-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.footer-logo {
  display: block;
  width: 58px;
  height: auto;
  object-fit: contain;
}

.footer-brand p,
.footer-links a,
.footer-contact a {
  color: #eef1f7;
  font-size: 14px;
  line-height: 1.35;
}

.footer-links a,
.socials a {
  transition: color 160ms ease;
}

.footer-links a:hover,
.footer-links a:focus-visible,
.socials a:hover,
.socials a:focus-visible {
  color: #bac5ff;
}

.footer-brand p {
  display: flex;
  align-items: center;
  gap: 10px;
  line-height: 1.35;
}

.footer-links,
.footer-contact {
  display: grid;
  align-content: start;
  gap: 16px;
}

.footer-links h3,
.footer-contact h3 {
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 1.15;
}

.footer-contact a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.footer-contact h3:nth-of-type(2) {
  margin-top: 18px;
}

.footer-contact .material-symbols-rounded {
  color: white;
  font-size: 22px;
  font-variation-settings: "FILL" 0, "wght" 500, "GRAD" 0, "opsz" 32;
}

.copyright-symbol {
  display: inline-grid;
  flex: 0 0 20px;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 21px;
  line-height: 20px;
  transform: translateY(1px);
  font-variation-settings: "FILL" 0, "wght" 500, "GRAD" 0, "opsz" 20;
}

.socials {
  display: flex;
  gap: 22px;
  margin-top: 4px;
}

.socials a {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  color: white;
  font-size: 18px;
  font-weight: 900;
}

.socials svg {
  display: block;
  width: 21px;
  height: 21px;
  fill: currentColor;
}

.socials .material-symbols-rounded {
  font-size: 24px;
  font-variation-settings: "FILL" 1, "wght" 700, "GRAD" 0, "opsz" 32;
}

@media (max-width: 920px) {
  section[id] {
    scroll-margin-top: 130px;
  }

  .floating-nav {
    top: 16px;
    height: auto;
    width: min(100% - 40px, 920px);
    min-height: 92px;
    padding: 16px 34px;
    border-radius: 34px;
  }

  .floating-nav nav {
    gap: clamp(24px, 5vw, 44px);
    font-size: 16px;
  }

  .hero-section {
    grid-template-columns: 1fr;
    gap: 18px;
    padding-top: 138px;
    text-align: center;
  }

  .hero-copy {
    justify-self: center;
  }

  .hero-copy-left,
  .hero-copy-right {
    justify-self: center;
  }

  .hero-portrait {
    order: 2;
    height: 430px;
  }

  .hero-copy {
    font-size: 18px;
  }

  .content-grid,
  .about-section,
  .expertise-intro,
  .faq-section,
  .contact-section {
    grid-template-columns: 1fr;
  }

  .faq-section {
    width: min(100% - 72px, 760px);
    gap: 48px;
    padding: 72px 0 96px;
  }

  .faq-copy h2 {
    max-width: 620px;
  }

  .faq-copy p {
    max-width: 620px;
  }

  .contact-section {
    width: min(100% - 72px, 680px);
    gap: 52px;
  }

  .contact-lines {
    margin-top: 56px;
  }

  .site-footer {
    grid-template-columns: minmax(280px, 1fr) minmax(180px, 0.8fr);
    gap: 56px;
    padding-left: 44px;
    padding-right: 44px;
  }

  .about-section {
    grid-template-areas:
      "heading"
      "visual"
      "text";
    width: min(100% - 72px, 760px);
    gap: 42px;
    padding: 72px 0 88px;
  }

  .about-visual {
    justify-self: start;
  }

  .about-text {
    margin-top: 0;
  }

  .expertise-cards,
  .project-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .expertise-section {
    width: min(100% - 72px, 760px);
    padding: 64px 0 88px;
  }

  .expertise-intro {
    gap: 28px;
  }

  .expertise-intro > p {
    max-width: 620px;
    padding-top: 0;
  }

  .projects-inner {
    width: min(100% - 72px, 860px);
  }

  .projects-top {
    align-items: flex-start;
    flex-direction: column;
  }

  .projects-top h2 {
    margin-bottom: 28px;
  }

  .outline-button {
    margin-top: 0;
  }

  .project-list {
    gap: 34px;
    margin-top: 64px;
  }

  .project-preview {
    height: auto;
  }

  .site-footer {
    grid-column: auto;
    gap: 34px;
  }
}

@media (max-width: 620px) {
  section[id] {
    scroll-margin-top: 110px;
  }

  .floating-nav {
    width: calc(100% - 24px);
    align-items: center;
    min-height: 78px;
    padding: 12px 18px;
    border-radius: 26px;
  }

  .brand-mark {
    width: 36px;
    height: 46px;
  }

  .brand-mark img {
    width: 24px;
  }

  .floating-nav nav {
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px 18px;
    max-width: 230px;
    font-size: 13px;
  }

  .hero-section {
    min-height: 660px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .hero-portrait {
    height: 380px;
    transform: scale(0.9);
  }

  .hero-photo {
    width: 330px;
    height: auto;
  }

  .role-badge {
    min-height: 38px;
    padding: 0 16px;
    font-size: 14px;
  }

  .badge-web {
    left: 4px;
    top: 236px;
  }

  .badge-ui {
    right: -2px;
    top: 190px;
  }

  .badge-graphic {
    right: 58px;
    bottom: 74px;
  }

  .content-grid,
  .expertise-section,
  .projects-inner,
  .faq-section,
  .contact-section {
    width: calc(100% - 40px);
  }

  h1,
  h2 {
    font-size: 30px;
  }

  .about-section h1 {
    font-size: 34px;
  }

  .about-visual img {
    width: min(100%, 252px);
  }

  .about-text {
    font-size: 14px;
  }

  .expertise-cards,
  .project-list {
    grid-template-columns: 1fr;
  }

  .expertise-section {
    padding: 54px 0 72px;
  }

  .expertise-intro .eyebrow {
    font-size: 16px;
  }

  .expertise-intro h2 {
    font-size: 36px;
  }

  .expertise-intro > p {
    font-size: 16px;
  }

  .expertise-cards {
    gap: 22px;
    margin-top: 46px;
  }

  .expertise-card {
    min-height: 280px;
  }

  .project-preview {
    height: auto;
  }

  .site-footer {
    grid-template-columns: 1fr;
    padding: 42px 28px 46px;
  }

  .footer-brand {
    grid-column: auto;
  }

  .footer-brand p,
  .footer-links a,
  .footer-contact a {
    font-size: 14px;
  }

  .footer-contact a {
    white-space: normal;
  }

  .faq-section {
    padding-bottom: 72px;
  }

  .faq-copy h2 {
    margin-bottom: 28px;
    font-size: 36px;
  }

  .faq-copy p {
    font-size: 16px;
    line-height: 1.3;
  }

  .faq-list {
    gap: 18px;
  }

  details {
    border-radius: 14px;
  }

  details p {
    padding: 0 18px 18px;
    font-size: 14px;
  }

  .contact-copy h2 {
    margin-bottom: 28px;
  }

  .contact-copy p {
    font-size: 16px;
  }

  .contact-lines {
    gap: 22px;
    margin-top: 46px;
    font-size: 16px;
  }

  .contact-lines a,
  .contact-lines span {
    gap: 18px;
  }

  .contact-icon {
    flex-basis: 22px;
    width: 22px;
    height: 22px;
    font-size: 22px;
  }

  .contact-form {
    gap: 26px;
  }

  .contact-form label {
    font-size: 16px;
  }

  .contact-form button {
    min-width: 100px;
    min-height: 50px;
    font-size: 16px;
  }

  summary {
    align-items: flex-start;
    gap: 18px;
    min-height: 58px;
    padding: 13px 18px;
    font-size: 18px;
    padding-top: 13px;
    padding-bottom: 13px;
  }

  summary::after {
    font-size: 30px;
  }
}
</style>
