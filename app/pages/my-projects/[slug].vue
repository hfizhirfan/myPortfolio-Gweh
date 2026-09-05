<script setup lang="ts">
import { computed } from 'vue'
import { projects } from '../../data/projects'

const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))
</script>

<template>
  <div v-if="project" class="space-y-8 py-6">
    <NuxtLink
      to="/my-projects"
      class="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
    >
      <span class="material-symbols-rounded text-base">arrow_back</span>
      Kembali ke Daftar Proyek
    </NuxtLink>

    <div class="space-y-4 max-w-3xl">
      <span class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
        {{ project.type }}
      </span>
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {{ project.title }}
      </h1>
      <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
        {{ project.detail }}
      </p>

      <div class="pt-2">
        <a
          v-if="project.liveUrl && project.liveUrl !== '#'"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-md transition"
        >
          <span class="material-symbols-rounded text-lg">rocket_launch</span>
          <span>Live Demo</span>
        </a>
      </div>
    </div>

    <!-- Preview Media -->
    <div class="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900">
      <img :src="project.image" :alt="project.title" class="w-full h-auto object-cover" />
    </div>

    <!-- Tech Stack -->
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Technologies & Tools Used
      </h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>

  <div v-else class="py-16 text-center space-y-4">
    <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Proyek Tidak Ditemukan</h2>
    <p class="text-slate-500">Halaman proyek yang Anda cari tidak tersedia.</p>
    <NuxtLink
      to="/my-projects"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
    >
      Kembali ke Proyek
    </NuxtLink>
  </div>
</template>
