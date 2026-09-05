<script setup lang="ts">
import { projects } from '../data/projects'
</script>

<template>
  <div class="space-y-10 py-6">
    <!-- Header -->
    <div class="max-w-2xl space-y-3">
      <NuxtLink
        to="/#experience"
        class="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline mb-2"
      >
        <span class="material-symbols-rounded text-base">arrow_back</span>
        Kembali ke Beranda
      </NuxtLink>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Selected Projects Showcase
      </h1>
      <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Kumpulan studi kasus proyek web, UI/UX, dan sistem informasi yang telah saya kembangkan.
      </p>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="project in projects"
        :key="project.slug"
        :to="`/my-projects/${project.slug}`"
        class="group flex flex-col rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700/60 transition-all duration-300 hover:-translate-y-1.5"
      >
        <!-- Media Image -->
        <div class="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-purple-600 dark:text-purple-400 border border-slate-200/60 dark:border-slate-800">
            {{ project.type }}
          </div>
        </div>

        <!-- Body -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {{ project.title }}
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
              {{ project.description }}
            </p>
          </div>

          <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
