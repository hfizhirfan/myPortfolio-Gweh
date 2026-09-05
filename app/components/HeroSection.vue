<script setup lang="ts">
import { heroData } from '../data/portfolioData'
</script>

<template>
  <section id="home" class="relative pt-6 pb-8 md:py-12 flex flex-col items-center">
    <!-- Ambient Background Glows -->
    <div
      class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 md:w-[600px] h-72 sm:h-96 md:h-[450px] bg-purple-500/15 dark:bg-purple-600/20 rounded-full blur-3xl -z-10 pointer-events-none"
    ></div>
    <div
      class="absolute top-1/3 right-10 w-60 h-60 bg-cyan-500/10 dark:bg-cyan-600/15 rounded-full blur-3xl -z-10 pointer-events-none"
    ></div>

    <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
      <!-- Left Column: Copywriting & Actions -->
      <div class="lg:col-span-7 flex flex-col items-start space-y-6 text-left reveal-on-scroll reveal-fade-left">
        <!-- Friendly Pill Badge -->
        <div
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold tracking-wide shadow-sm"
        >
          <span class="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span>{{ heroData.greeting }}</span>
        </div>

        <!-- Headline & Name -->
        <div class="space-y-2">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            I'm <span class="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">{{ heroData.name }}</span>
          </h1>
          <p class="text-base sm:text-lg font-semibold text-purple-600 dark:text-purple-400">
            {{ heroData.role }}
          </p>
        </div>

        <!-- Short Description -->
        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
          {{ heroData.shortDescription }}
        </p>

        <!-- CTA Action Buttons & Socials -->
        <div class="flex flex-wrap items-center gap-3.5 pt-2">
          <a
            href="#contact"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
          >
            <span>Let's Connect</span>
            <span class="material-symbols-rounded text-lg">arrow_forward</span>
          </a>

          <a
            href="/Portfolio HMI.pdf"
            target="_blank"
            class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300/80 dark:border-slate-700 hover:-translate-y-0.5 transition-all"
          >
            <span class="material-symbols-rounded text-purple-600 dark:text-purple-400 text-lg">visibility</span>
            <span>View Portfolio</span>
          </a>

          <!-- Social Quick Links -->
          <div class="flex items-center gap-2 pl-1">
            <a
              v-for="social in heroData.socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :title="social.label"
              class="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition"
            >
              <!-- LinkedIn SVG -->
              <svg
                v-if="social.icon === 'linkedin'"
                class="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>

              <!-- GitHub SVG -->
              <svg
                v-else-if="social.icon === 'github'"
                class="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>

              <!-- Fallback Icon -->
              <span v-else class="material-symbols-rounded text-lg">{{ social.icon }}</span>
            </a>
          </div>
        </div>

        <!-- Quick Stats Cards -->
        <div class="grid grid-cols-3 gap-3 pt-4 w-full max-w-lg border-t border-slate-200/80 dark:border-slate-800 reveal-on-scroll reveal-delay-2">
          <div
            v-for="stat in heroData.stats"
            :key="stat.label"
            class="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-sm shadow-xs"
          >
            <span class="block text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{{ stat.value }}</span>
            <span class="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight block mt-0.5">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Visual Portrait with Floating Badges -->
      <div class="lg:col-span-5 flex justify-center items-center relative reveal-on-scroll reveal-fade-right reveal-delay-1">
        <div class="relative w-full max-w-[340px] sm:max-w-[380px]">
          <!-- Geometric Aura Frame -->
          <div class="absolute -inset-2 bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-cyan-500/30 rounded-3xl blur-xl"></div>

          <!-- Photo Container -->
          <div class="relative rounded-3xl overflow-hidden bg-gradient-to-b from-purple-100 via-slate-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-700 shadow-2xl">
            <img
              :src="heroData.portraitImage"
              :alt="heroData.portraitAlt"
              class="w-full h-auto object-cover object-top scale-105 hover:scale-110 transition-transform duration-500"
            />
          </div>

          <!-- Floating Skill Badges (Referencing modern badge aesthetic) -->
          <!-- Badge 1: Web Developer -->
          <div
            class="absolute -top-3 -right-3 sm:-right-4 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-purple-200 dark:border-purple-800 shadow-lg flex items-center gap-2 animate-bounce [animation-duration:4s]"
          >
            <div class="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <span class="material-symbols-rounded text-base">code</span>
            </div>
            <div class="flex flex-col text-left">
              <span class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Specialty</span>
              <span class="text-xs font-bold text-slate-800 dark:text-slate-100">Web Developer</span>
            </div>
          </div>

          <!-- Badge 2: UI/UX Designer -->
          <div
            class="absolute top-1/2 -left-4 sm:-left-6 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-cyan-200 dark:border-cyan-800 shadow-lg flex items-center gap-2 animate-bounce [animation-duration:4.5s] [animation-delay:1s]"
          >
            <div class="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-900/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <span class="material-symbols-rounded text-base">brush</span>
            </div>
            <div class="flex flex-col text-left">
              <span class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Design</span>
              <span class="text-xs font-bold text-slate-800 dark:text-slate-100">UI/UX Designer</span>
            </div>
          </div>

          <!-- Badge 3: Graphic Designer -->
          <div
            class="absolute -bottom-3 right-4 px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-indigo-200 dark:border-indigo-800 shadow-lg flex items-center gap-2 animate-bounce [animation-duration:4.2s] [animation-delay:2s]"
          >
            <div class="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <span class="material-symbols-rounded text-base">palette</span>
            </div>
            <div class="flex flex-col text-left">
              <span class="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Creative</span>
              <span class="text-xs font-bold text-slate-800 dark:text-slate-100">Graphic Designer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

