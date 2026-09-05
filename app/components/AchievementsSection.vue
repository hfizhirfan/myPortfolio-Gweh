<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { achievementsData } from '../data/portfolioData'

const awards = achievementsData.filter((item) => item.type === 'award')
const certifications = achievementsData.filter((item) => item.type === 'certification')

const previewModal = ref({
  isOpen: false,
  imageSrc: '',
  title: '',
})

const openPreview = (imageSrc: string, title: string) => {
  previewModal.value = {
    isOpen: true,
    imageSrc,
    title,
  }
}

const closePreview = () => {
  previewModal.value.isOpen = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && previewModal.value.isOpen) {
    closePreview()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section id="achievements" class="relative py-12 border-t border-slate-200/60 dark:border-slate-800/80">
    <!-- Section Header -->
    <div class="text-center max-w-2xl mx-auto mb-12 space-y-3 reveal-on-scroll">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
        <span class="material-symbols-rounded text-sm">emoji_events</span>
        <span>Recognition & Credentials</span>
      </div>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Achievement & Certifications
      </h2>
      <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        National data infographic competition honors and industry technical credentials (Enterprise ERP, Database, AI, and Project Management).
      </p>
    </div>

    <!-- 1. Highlighted Award Card (Top Horizontal Banner) -->
    <div class="mb-6 reveal-on-scroll reveal-scale">
      <div
        v-for="award in awards"
        :key="award.id"
        class="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-white dark:to-slate-900 border border-amber-300/80 dark:border-amber-700/60 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-amber-400 transition-all duration-300"
      >
        <!-- Left: Trophy Icon + Title + Issuer + Meta Info -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 shrink-0">
            <span class="material-symbols-rounded text-3xl">trophy</span>
          </div>

          <div class="space-y-1.5 text-left">
            <div class="flex flex-wrap items-center gap-2.5 mb-0.5">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Honor & Award
              </span>
              <span class="px-3 py-0.5 rounded-full text-xs font-black uppercase bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                {{ award.badgeText }}
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
              {{ award.title }}
            </h3>

            <div class="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-0.5">
              <span class="font-semibold flex items-center gap-1">
                <span class="material-symbols-rounded text-base text-amber-500">school</span>
                {{ award.issuer }}
              </span>
              <span class="text-slate-300 dark:text-slate-700">•</span>
              <span class="text-slate-500 dark:text-slate-400">National Data Visualization Competition</span>
              <span class="text-slate-300 dark:text-slate-700">•</span>
              <span class="font-bold text-amber-600 dark:text-amber-400">{{ award.date }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Preview Certificate Button -->
        <div class="shrink-0 flex items-center self-start sm:self-center" v-if="award.certificateImage">
          <button
            type="button"
            class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 transition-all cursor-pointer"
            @click="openPreview(award.certificateImage, award.title)"
          >
            <span class="material-symbols-rounded text-lg">visibility</span>
            <span>View Certificate</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. Certifications Grid (Bottom: 2 Rows x 3 Columns = 6 Cards) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      <div
        v-for="(cert, index) in certifications"
        :key="cert.id"
        class="group rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 reveal-on-scroll"
        :class="`reveal-delay-${(index % 6) + 1}`"
      >
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <span class="material-symbols-rounded text-lg">verified</span>
            </div>
            <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
              {{ cert.badgeText }}
            </span>
          </div>

          <h4 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
            {{ cert.title }}
          </h4>

          <!-- Issuer with Logo -->
          <div class="flex items-center gap-2 mt-2">
            <img
              v-if="cert.issuerLogo"
              :src="cert.issuerLogo"
              :alt="cert.issuer"
              class="w-4 h-4 rounded-sm object-contain shrink-0 border border-slate-200/60 dark:border-slate-700/60 bg-white"
            />
            <p class="text-xs font-semibold text-slate-600 dark:text-slate-300">
              {{ cert.issuer }}
            </p>
          </div>
        </div>

        <!-- Bottom Action & Meta -->
        <div class="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span class="font-medium">Issued</span>
            <span class="font-bold text-slate-700 dark:text-slate-300">{{ cert.date }}</span>
          </div>

          <a
            :href="cert.credentialUrl || '#'"
            :target="cert.credentialUrl && cert.credentialUrl !== '#' ? '_blank' : '_self'"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 hover:bg-purple-50 dark:bg-slate-800/80 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 shadow-2xs hover:shadow-xs transition-all group/btn"
          >
            <span>Show credential</span>
            <span class="material-symbols-rounded text-sm transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">open_in_new</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Certificate Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="previewModal.isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
        @click.self="closePreview"
      >
        <div class="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {{ previewModal.title }}
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Official Award Certificate</p>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                aria-label="Close Preview"
                class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/60 dark:hover:text-red-400 transition cursor-pointer"
                @click="closePreview"
              >
                <span class="material-symbols-rounded text-xl">close</span>
              </button>
            </div>
          </div>

          <!-- Certificate Image Viewer -->
          <div class="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-slate-100/50 dark:bg-slate-950/60">
            <img
              :src="previewModal.imageSrc"
              :alt="previewModal.title"
              class="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800"
            />
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
