<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import AchievementsSection from './components/AchievementsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const route = useRoute()
const isDarkMode = ref(false)

const applyTheme = (useDark: boolean) => {
  isDarkMode.value = useDark
  if (useDark) {
    document.documentElement.classList.add('dark')
    document.documentElement.dataset.theme = 'dark'
    document.documentElement.style.colorScheme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.dataset.theme = 'light'
    document.documentElement.style.colorScheme = 'light'
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio-theme', useDark ? 'dark' : 'light')
  }
}

const toggleTheme = () => {
  applyTheme(!isDarkMode.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('portfolio-theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark)

  // Force scroll to top and clear hash on refresh/load
  if (typeof window !== 'undefined') {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
})
</script>

<template>
  <div
    class="min-h-screen font-sans transition-colors duration-300 selection:bg-purple-600 selection:text-white overflow-x-hidden"
    :class="[
      isDarkMode
        ? 'dark bg-slate-950 text-slate-100'
        : 'bg-slate-50 text-slate-900',
    ]"
  >
    <!-- Floating Navigation Bar -->
    <Navbar :is-dark="isDarkMode" @toggle-theme="toggleTheme" />

    <!-- Subpage View (if route matches subpages) -->
    <main v-if="route.path.startsWith('/my-projects')" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <NuxtPage />
    </main>

    <!-- Main Single Page Portfolio -->
    <main v-else class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-16 sm:space-y-20">
      <!-- 1. Hero Section ("Hello, there") -->
      <HeroSection />

      <!-- 2. About Me Section -->
      <AboutSection />

      <!-- 3. My Service Section (Graphic Design, UI/UX, Web Development) -->
      <ServicesSection />

      <!-- 4. My Experience & Projects (Vue.js, Laravel, React.js, Django, Nuxt.js) -->
      <ExperienceSection />

      <!-- 5. Achievement & Certificate Section -->
      <AchievementsSection />

      <!-- 6. Contact Me Section ("Let's Connect") -->
      <ContactSection />
    </main>

    <!-- Footer -->
    <FooterSection />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.3);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.6);
}

/* Smooth Scroll Reveal Animations */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}

.reveal-on-scroll.reveal-fade-left {
  transform: translateX(-35px);
}

.reveal-on-scroll.reveal-fade-right {
  transform: translateX(35px);
}

.reveal-on-scroll.reveal-scale {
  transform: scale(0.92) translateY(25px);
}

.reveal-on-scroll.is-revealed {
  opacity: 1;
  transform: translate(0, 0) scale(1);
}

/* Staggered animation delays */
.reveal-delay-1 { transition-delay: 100ms; }
.reveal-delay-2 { transition-delay: 200ms; }
.reveal-delay-3 { transition-delay: 300ms; }
.reveal-delay-4 { transition-delay: 400ms; }
.reveal-delay-5 { transition-delay: 500ms; }
.reveal-delay-6 { transition-delay: 600ms; }

@media (prefers-reduced-motion: reduce) {
  .reveal-on-scroll {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
