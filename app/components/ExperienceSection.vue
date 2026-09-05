<script setup lang="ts">
import { ref, computed } from 'vue'
import { experiencesAndProjects } from '../data/portfolioData'

const activeTab = ref<'experience' | 'project'>('experience')

const filteredItems = computed(() => {
  return experiencesAndProjects.filter((item) => item.type === activeTab.value)
})
</script>

<template>
  <section id="experience" class="relative py-12 border-t border-slate-200/60 dark:border-slate-800/80">
    <!-- Header & Filter Tabs -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 reveal-on-scroll">
      <div class="space-y-3 max-w-xl text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <span class="material-symbols-rounded text-sm">work_history</span>
          <span>Career & Projects</span>
        </div>
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

          <!-- Role & Company -->
          <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {{ item.role }}
          </h3>
          <p class="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-1.5">
            <span class="material-symbols-rounded text-base">apartment</span>
            {{ item.company }}
          </p>

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
        </div>
      </div>
    </div>
  </section>
</template>

