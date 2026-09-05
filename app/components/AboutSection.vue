<script setup lang="ts">
import { aboutData } from '../data/portfolioData'
</script>

<template>
  <section id="about" class="relative py-12 border-t border-slate-200/60 dark:border-slate-800/80">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      <!-- Left Column: Visual Photo / Showcase -->
      <div class="lg:col-span-5 flex justify-center reveal-on-scroll reveal-fade-left">
        <div class="relative w-full max-w-sm group">
          <!-- Gradient border glow -->
          <div class="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-md opacity-40 group-hover:opacity-70 transition duration-500"></div>

          <div class="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <img
              :src="aboutData.image"
              :alt="aboutData.fullName"
              class="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span class="text-xs font-semibold text-slate-700 dark:text-slate-300">{{ aboutData.status }}</span>
              </div>
              <span class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span class="material-symbols-rounded text-sm text-purple-600 dark:text-purple-400">location_on</span>
                Surabaya, ID
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Narrative & Values -->
      <div class="lg:col-span-7 flex flex-col space-y-6 text-left reveal-on-scroll reveal-fade-right">
        <!-- Eyebrow -->
        <div class="flex items-center gap-2">
          <span class="h-px w-8 bg-purple-600"></span>
          <span class="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            {{ aboutData.eyebrow }}
          </span>
        </div>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {{ aboutData.title }}
        </h2>

        <div class="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            {{ aboutData.description }}
          </p>
          <p class="text-slate-500 dark:text-slate-400">
            {{ aboutData.extendedDescription }}
          </p>
        </div>

        <!-- Highlights Bento Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 reveal-on-scroll reveal-delay-2">
          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3 hover:-translate-y-1 transition duration-300">
            <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <span class="material-symbols-rounded text-xl">psychology</span>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white">Human-Centered Design</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                Focus on formulating user-centric solutions backed by real user needs & usability testing.
              </p>
            </div>
          </div>

          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3 hover:-translate-y-1 transition duration-300">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <span class="material-symbols-rounded text-xl">layers</span>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white">End-to-End Execution</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                Bridging wireframing, frontend Vue/React, and backend Laravel/Django architecture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

