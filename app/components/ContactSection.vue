<script setup lang="ts">
import { ref } from 'vue'
import { contactData } from '../data/portfolioData'

const WEB3FORMS_ACCESS_KEY = '6450e637-b789-444e-b0bb-bd92c2919ba4'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitted = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) return
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject || `Pesan Baru dari ${form.value.name} (Portfolio HMI)`,
        message: form.value.message,
        from_name: form.value.name,
      }),
    })

    const data = await response.json()
    if (data.success) {
      isSubmitted.value = true
      form.value = { name: '', email: '', subject: '', message: '' }
      setTimeout(() => {
        isSubmitted.value = false
      }, 7000)
    } else {
      errorMessage.value = data.message || 'Gagal mengirim pesan. Silakan coba beberapa saat lagi.'
    }
  } catch (err) {
    errorMessage.value = 'Terjadi gangguan koneksi. Silakan periksa jaringan internet Anda.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section id="contact" class="relative py-12 border-t border-slate-200/60 dark:border-slate-800/80">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
      <!-- Left Column: Contact Details -->
      <div class="lg:col-span-5 flex flex-col justify-between space-y-6 text-left reveal-on-scroll reveal-fade-left">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <span class="material-symbols-rounded text-sm">mail</span>
            <span>{{ contactData.eyebrow }}</span>
          </div>

          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {{ contactData.title }}
          </h2>

          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
            {{ contactData.description }}
          </p>
        </div>

        <!-- Direct Contact Cards -->
        <div class="space-y-3.5 pt-2">
          <!-- Email Card -->
          <a
            :href="`mailto:${contactData.email}`"
            class="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition flex items-center gap-3.5"
          >
            <div class="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span class="material-symbols-rounded text-xl">alternate_email</span>
            </div>
            <div class="flex-1 min-w-0">
              <span class="block text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">Email Address</span>
              <span class="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {{ contactData.email }}
              </span>
            </div>
            <span class="material-symbols-rounded text-slate-400 group-hover:text-purple-600 transition-transform group-hover:translate-x-1">arrow_outward</span>
          </a>

          <!-- WhatsApp / Phone Card -->
          <a
            :href="contactData.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition flex items-center gap-3.5"
          >
            <div class="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span class="material-symbols-rounded text-xl">chat</span>
            </div>
            <div class="flex-1 min-w-0">
              <span class="block text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">WhatsApp / Phone</span>
              <span class="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {{ contactData.phone }}
              </span>
            </div>
            <span class="material-symbols-rounded text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1">arrow_outward</span>
          </a>

          <!-- Location Card -->
          <div class="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <span class="material-symbols-rounded text-xl">location_on</span>
            </div>
            <div>
              <span class="block text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">Location</span>
              <span class="block text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {{ contactData.location }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Visual Contact Form (Stretched to Match Left Height) -->
      <div class="lg:col-span-7 flex flex-col reveal-on-scroll reveal-fade-right reveal-delay-1">
        <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1.5">
              Send a Message
            </h3>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
              Leave your message and inquiry, and I will get back to you promptly.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-4 flex-1 flex flex-col justify-between">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Name -->
              <div>
                <label for="name" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Email
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <!-- Subject -->
            <div>
              <label for="subject" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="Collaboration Opportunity / Project Inquiry"
                class="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            <!-- Message (Flex-1 Expanding Area) -->
            <div class="flex-1 flex flex-col">
              <label for="message" class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                placeholder="Tell me more about your project or inquiry..."
                class="w-full flex-1 min-h-[110px] px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
              ></textarea>
            </div>

            <!-- Notification State: Success -->
            <div
              v-if="isSubmitted"
              class="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2"
            >
              <span class="material-symbols-rounded text-lg">check_circle</span>
              <span>Terima kasih! Pesan Anda telah terkirim langsung ke email saya.</span>
            </div>

            <!-- Notification State: Error -->
            <div
              v-if="errorMessage"
              class="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2"
            >
              <span class="material-symbols-rounded text-lg">error</span>
              <span>{{ errorMessage }}</span>
            </div>

            <!-- Submit Button -->
            <div class="pt-1">
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                <span v-if="isLoading" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span class="material-symbols-rounded text-lg" v-else>send</span>
                <span>{{ isLoading ? 'Sending...' : 'Send Message' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

