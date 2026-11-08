<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  experiencesAndProjects,
  type ExperienceItem,
  type ProjectScreenshot,
} from '../data/portfolioData'

const activeTab = ref<'experience' | 'project'>('experience')

const filteredItems = computed(() => {
  return experiencesAndProjects.filter((item) => item.type === activeTab.value)
})

const galleryModal = ref({
  isOpen: false,
  title: '',
  currentIndex: 0,
  screenshots: [] as ProjectScreenshot[],
})

const currentScreenshot = computed(() => {
  if (!galleryModal.value.isOpen || galleryModal.value.screenshots.length === 0) {
    return null
  }
  return galleryModal.value.screenshots[galleryModal.value.currentIndex] || null
})

const openGallery = (item: ExperienceItem) => {
  if (!item.screenshots || item.screenshots.length === 0) return
  galleryModal.value = {
    isOpen: true,
    title: item.company,
    currentIndex: 0,
    screenshots: item.screenshots,
  }
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeGallery = () => {
  galleryModal.value.isOpen = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const nextScreenshot = () => {
  if (galleryModal.value.screenshots.length === 0) return
  galleryModal.value.currentIndex =
    (galleryModal.value.currentIndex + 1) % galleryModal.value.screenshots.length
}

const prevScreenshot = () => {
  if (galleryModal.value.screenshots.length === 0) return
  galleryModal.value.currentIndex =
    (galleryModal.value.currentIndex - 1 + galleryModal.value.screenshots.length) %
    galleryModal.value.screenshots.length
}

const setScreenshotIndex = (index: number) => {
  galleryModal.value.currentIndex = index
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!galleryModal.value.isOpen) return
  if (e.key === 'Escape') closeGallery()
  if (e.key === 'ArrowRight') nextScreenshot()
  if (e.key === 'ArrowLeft') prevScreenshot()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <section id="experience" class="relative py-12 border-t border-slate-200/60 dark:border-slate-800/80">
    <!-- Header & Filter Tabs -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 reveal-on-scroll">
      <div class="space-y-3 max-w-xl text-left">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Experience & Projects
        </h2>
        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Professional career track record and featured projects built with Vue.js, React.js, Laravel, Django, and Nuxt.js.
        </p>
      </div>

      <!-- Filter Buttons -->
      <div class="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start md:self-auto">
        <button
          type="button"
          class="px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
          :class="[
            activeTab === 'experience'
              ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
          ]"
          @click="activeTab = 'experience'"
        >
          Work Experience
        </button>
        <button
          type="button"
          class="px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
          :class="[
            activeTab === 'project'
              ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
          ]"
          @click="activeTab = 'project'"
        >
          Featured Projects
        </button>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-on-scroll reveal-delay-1">
      <div
        v-for="(item, index) in filteredItems"
        :key="item.id"
        class="group relative rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
      >
        <div>
          <!-- Header info: Type Badge & Period -->
          <div class="flex items-center justify-between gap-3 mb-4">
            <span
              class="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
              :class="[
                item.type === 'experience'
                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                  : 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800',
              ]"
            >
              {{ item.employmentType }}
            </span>

            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span class="material-symbols-rounded text-sm">calendar_today</span>
              {{ item.period }}
            </span>
          </div>

          <!-- Role & Company with Left Logo (As in mockup) -->
          <div class="flex items-center gap-3.5 sm:gap-4 mb-4">
            <!-- Square Logo (No border, slightly rounded, aligned with text height) -->
            <img
              v-if="item.companyLogo"
              :src="item.companyLogo"
              :alt="item.company"
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div
              v-else-if="item.type === 'project'"
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform"
            >
              <span class="material-symbols-rounded text-xl sm:text-2xl">laptop</span>
            </div>

            <!-- Position & Company Name -->
            <div class="min-w-0 flex-1">
              <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                {{ item.role }}
              </h3>
              <p class="text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 truncate mt-0.5">
                {{ item.company }}
              </p>
            </div>
          </div>

          <!-- Description -->
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ item.description }}
          </p>
        </div>

        <!-- Tech Stack Chips -->
        <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Tech Stack & Technologies
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in item.techStack"
              :key="tech"
              class="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
            >
              {{ tech }}
            </span>
          </div>

          <!-- "See" Screenshots Button -->
          <div
            v-if="item.screenshots && item.screenshots.length"
            class="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3"
          >
            <div class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span class="material-symbols-rounded text-base text-purple-600 dark:text-purple-400">photo_library</span>
              <span class="font-medium">{{ item.screenshots.length }} Screenshots</span>
            </div>

            <button
              type="button"
              class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 hover:bg-purple-50 dark:bg-slate-800/80 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 shadow-2xs hover:shadow-xs transition-all group/btn cursor-pointer"
              @click="openGallery(item)"
            >
              <span>See</span>
              <span class="material-symbols-rounded text-sm text-purple-600 dark:text-purple-400 transition-transform group-hover/btn:scale-110">visibility</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Screenshots Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="galleryModal.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md transition-opacity duration-300"
        @click.self="closeGallery"
      >
        <div class="relative max-w-5xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div class="min-w-0 pr-4">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Project Screenshots
                </span>
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {{ galleryModal.currentIndex + 1 }} / {{ galleryModal.screenshots.length }}
                </span>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate mt-1">
                {{ currentScreenshot?.title || galleryModal.title }}
              </h3>
              <p class="text-xs text-purple-600 dark:text-purple-400 truncate">
                {{ galleryModal.title }}
              </p>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Close Preview"
                class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 dark:hover:text-red-400 transition cursor-pointer"
                @click="closeGallery"
              >
                <span class="material-symbols-rounded text-xl">close</span>
              </button>
            </div>
          </div>

          <!-- Main Image Viewer with Navigation Arrows -->
          <div class="relative flex-1 min-h-[300px] max-h-[60vh] sm:max-h-[65vh] p-3 sm:p-6 overflow-hidden flex items-center justify-center bg-slate-950/50">
            <!-- Previous Button -->
            <button
              v-if="galleryModal.screenshots.length > 1"
              type="button"
              aria-label="Previous Screenshot"
              class="absolute left-3 sm:left-5 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg transition active:scale-90 cursor-pointer"
              @click="prevScreenshot"
            >
              <span class="material-symbols-rounded text-2xl">chevron_left</span>
            </button>

            <!-- Active Screenshot Image -->
            <img
              v-if="currentScreenshot"
              :key="currentScreenshot.image"
              :src="currentScreenshot.image"
              :alt="currentScreenshot.title"
              class="max-w-full max-h-[56vh] sm:max-h-[60vh] object-contain rounded-xl shadow-2xl border border-slate-700/50 transition-all duration-200 select-none"
            />

            <!-- Next Button -->
            <button
              v-if="galleryModal.screenshots.length > 1"
              type="button"
              aria-label="Next Screenshot"
              class="absolute right-3 sm:right-5 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg transition active:scale-90 cursor-pointer"
              @click="nextScreenshot"
            >
              <span class="material-symbols-rounded text-2xl">chevron_right</span>
            </button>
          </div>

          <!-- Thumbnail Strip Footer -->
          <div
            v-if="galleryModal.screenshots.length > 1"
            class="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800"
          >
            <div class="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                v-for="(screenshot, idx) in galleryModal.screenshots"
                :key="screenshot.image"
                type="button"
                :title="screenshot.title"
                class="relative shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer group"
                :class="[
                  galleryModal.currentIndex === idx
                    ? 'border-purple-600 ring-2 ring-purple-500/40 scale-105 opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700',
                ]"
                @click="setScreenshotIndex(idx)"
              >
                <img
                  :src="screenshot.image"
                  :alt="screenshot.title"
                  class="w-16 h-11 sm:w-20 sm:h-13 object-cover"
                />
                <span class="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[9px] text-white font-medium text-center truncate px-1 py-0.5">
                  {{ idx + 1 }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

