<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm py-10 mt-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
      <!-- Brand & Tagline -->
      <div class="flex items-center gap-3">
        <a href="#home" class="flex items-center group cursor-pointer" aria-label="HMI Home" @click.prevent="scrollToTop">
          <img src="/HMI%20Ungu.png" alt="HMI" class="h-8 w-auto dark:hidden transition-transform group-hover:scale-105" />
          <img src="/HMI%20Putih.png" alt="HMI" class="h-8 w-auto hidden dark:block transition-transform group-hover:scale-105" />
        </a>
      </div>

      <!-- Quick Nav Links -->
      <div class="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <a href="#home" class="hover:text-purple-600 dark:hover:text-purple-400 transition">Home</a>
        <a href="#about" class="hover:text-purple-600 dark:hover:text-purple-400 transition">About</a>
        <a href="#services" class="hover:text-purple-600 dark:hover:text-purple-400 transition">Services</a>
        <a href="#experience" class="hover:text-purple-600 dark:hover:text-purple-400 transition">Experience</a>
        <a href="#achievements" class="hover:text-purple-600 dark:hover:text-purple-400 transition">Achievements</a>
        <a href="#contact" class="hover:text-purple-600 dark:hover:text-purple-400 transition">Contact</a>
      </div>

      <!-- Back to Top & Socials & Copyright -->
      <div class="flex items-center gap-4">
        <!-- Socials in Footer -->
        <div class="flex items-center gap-2">
          <a
            href="https://linkedin.com/in/hfizh-irfansyah"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
          <a
            href="https://github.com/hfizhirfan"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
        </div>

        <p class="text-xs text-slate-400 dark:text-slate-500">
          © {{ new Date().getFullYear() }} HMI.
        </p>

        <button
          type="button"
          aria-label="Back to Top"
          class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-purple-100 dark:hover:bg-purple-950/60 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition"
          @click="scrollToTop"
        >
          <span class="material-symbols-rounded text-base">arrow_upward</span>
        </button>
      </div>
    </div>
  </footer>
</template>

