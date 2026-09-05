export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window === 'undefined') return

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  window.addEventListener('load', () => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  })

  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0)
  })

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.05,
  }

  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    if (!observer && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer?.unobserve(entry.target)
          }
        })
      }, observerOptions)
    }
    return observer
  }

  const observeAllReveals = () => {
    const obs = getObserver()
    if (!obs) return
    const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)')
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed')
      } else {
        obs.observe(el)
      }
    })
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el, binding) {
      el.classList.add('reveal-on-scroll')
      if (binding.value && typeof binding.value === 'string') {
        el.classList.add(binding.value)
      }
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-revealed')
      } else {
        const obs = getObserver()
        if (obs) {
          obs.observe(el)
        } else {
          el.classList.add('is-revealed')
        }
      }
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })

  if (typeof MutationObserver !== 'undefined') {
    const mutationObserver = new MutationObserver(() => {
      observeAllReveals()
    })

    nuxtApp.hook('app:mounted', () => {
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      })
      setTimeout(observeAllReveals, 50)
      setTimeout(observeAllReveals, 300)
    })
  }

  nuxtApp.hook('page:finish', () => {
    setTimeout(observeAllReveals, 50)
  })
})
