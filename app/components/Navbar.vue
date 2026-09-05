<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  isDark: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleTheme'): void
}>()

const isMobileMenuOpen = ref(false)
const isCvDropdownOpen = ref(false)
const activeSection = ref('home')
const isScrolled = ref(false)

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Achievements', href: '#achievements', id: 'achievements' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20

  const scrollPosition = window.scrollY + 180
  for (const link of navLinks) {
    const section = document.getElementById(link.id)
    if (section) {
      const top = section.offsetTop
      const height = section.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = link.id
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const scrollToSection = (e: MouseEvent, id: string) => {
  e.preventDefault()
  closeMobileMenu()
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    activeSection.value = 'home'
    return
  }
  const element = document.getElementById(id)
  if (element) {
    const yOffset = -90
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
    history.replaceState(null, '', window.location.pathname + window.location.search)
    activeSection.value = id
  }
}
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-4"
  >
    <div
      class="max-w-6xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between"
      :class="[
        isScrolled
          ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-lg shadow-slate-900/5 dark:shadow-black/20 border border-slate-200/80 dark:border-slate-800'
          : 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/40 dark:border-slate-800/40',
      ]"
    >
      <!-- Logo Branding -->
      <a
        href="#home"
        class="flex items-center group cursor-pointer"
        aria-label="HMI Home"
        @click="(e) => scrollToSection(e, 'home')"
      >
        <img
          :src="props.isDark ? '/HMI Putih.png' : '/HMI Ungu.png'"
          alt="HMI Logo"
          class="h-9 w-auto transition-transform group-hover:scale-105"
        />
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-1 lg:gap-2">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          class="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer"
          :class="[
            activeSection === link.id
              ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30'
              : 'text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-800/60',
          ]"
          @click="(e) => scrollToSection(e, link.id)"
        >
          {{ link.name }}
        </a>
      </nav>

      <!-- Action Area: CV Dropdown & Theme Toggle -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Download CV Dropdown -->
        <div class="relative">
          <button
            type="button"
            class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300/60 dark:border-slate-700 transition"
            @click="isCvDropdownOpen = !isCvDropdownOpen"
          >
            <span class="material-symbols-rounded text-base text-purple-600 dark:text-purple-400">download</span>
            <span>CV</span>
            <span class="material-symbols-rounded text-sm transition-transform duration-200" :class="{ 'rotate-180': isCvDropdownOpen }">expand_more</span>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isCvDropdownOpen"
            class="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95"
            @click="isCvDropdownOpen = false"
          >
            <a
              href="/CV_Hafizh Muhammad Irfansyah.pdf"
              download
              class="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              <span class="material-symbols-rounded text-base">description</span>
              Bahasa Indonesia
            </a>
            <a
              href="/CV_Hafizh Muhammad Irfansyah English.pdf"
              download
              class="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              <span class="material-symbols-rounded text-base">language</span>
              English Version
            </a>
          </div>
        </div>

        <!-- Theme Toggle -->
        <button
          type="button"
          :aria-label="props.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 transition"
          @click="emit('toggleTheme')"
        >
          <span class="material-symbols-rounded text-lg">
            {{ props.isDark ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>

        <!-- Mobile Menu Hamburger -->
        <button
          type="button"
          aria-label="Open Mobile Menu"
          class="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <span class="material-symbols-rounded text-xl">
            {{ isMobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden max-w-6xl mx-auto mt-2 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-2"
    >
      <a
        v-for="link in navLinks"
        :key="link.id"
        :href="link.href"
        class="px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer"
        :class="[
          activeSection === link.id
            ? 'bg-purple-600 text-white'
            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
        ]"
        @click="(e) => scrollToSection(e, link.id)"
      >
        {{ link.name }}
      </a>
      <div class="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1.5">
        <a
          href="/CV_Hafizh Muhammad Irfansyah.pdf"
          download
          class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 rounded-lg"
          @click="closeMobileMenu"
        >
          <span class="material-symbols-rounded text-base">download</span>
          Download CV (Indonesian Version)
        </a>
        <a
          href="/CV_Hafizh Muhammad Irfansyah English.pdf"
          download
          class="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 rounded-lg"
          @click="closeMobileMenu"
        >
          <span class="material-symbols-rounded text-base">download</span>
          Download CV (English Version)
        </a>
      </div>
    </div>
  </header>
</template>

