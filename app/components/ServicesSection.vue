<script setup lang="ts">
import { servicesData } from '../data/portfolioData'
</script>

<template>
  <section id="services" class="relative py-12 border-t border-slate-200/60 dark:border-slate-800/80">
    <!-- Section Header -->
    <div class="text-center max-w-2xl mx-auto mb-12 space-y-3 reveal-on-scroll">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
        <span class="material-symbols-rounded text-sm">auto_awesome</span>
        <span>My Services & Specialisation</span>
      </div>
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Bridging Design Craftsmanship & Software Engineering
      </h2>
      <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Delivering a unique blend of communicative visual aesthetics, intuitive UI/UX design, and robust modern web architecture.
      </p>
    </div>

    <!-- 3 Services Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(service, index) in servicesData"
        :key="service.id"
        class="group relative rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 reveal-on-scroll"
        :class="`reveal-delay-${index + 1}`"
      >
        <!-- Top Gradient Glow on Hover -->
        <div class="absolute -top-px inset-x-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div>
          <!-- Icon & Counter Header -->
          <div class="flex items-center justify-between mb-6">
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-md"
              :class="service.accentColor"
            >
              <span class="material-symbols-rounded text-2xl">{{ service.icon }}</span>
            </div>
            <span class="text-3xl font-black text-slate-200 dark:text-slate-800 group-hover:text-purple-600/20 dark:group-hover:text-purple-400/20 transition">
              0{{ index + 1 }}
            </span>
          </div>

          <!-- Service Title & Subtitle -->
          <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {{ service.title }}
          </h3>
          <p class="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1 mb-3">
            {{ service.subtitle }}
          </p>

          <!-- Description -->
          <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {{ service.description }}
          </p>
        </div>

        <!-- Tech / Skill Stack Chips -->
        <div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
          <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
            Key Stack & Tools
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in service.tags"
              :key="tag"
              class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 group-hover:bg-purple-50 dark:group-hover:bg-purple-950/40 group-hover:text-purple-700 dark:group-hover:text-purple-300 group-hover:border-purple-200 dark:group-hover:border-purple-800/60 transition"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

