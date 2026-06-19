<script setup lang="ts">
import { computed } from 'vue'
import { projects } from '../../data/projects'

const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))
</script>

<template>
  <section v-if="project" class="project-detail-page reveal-on-scroll is-visible">
    <NuxtLink class="back-button" to="/my-projects">
      <span class="material-symbols-rounded" aria-hidden="true">arrow_back</span>
      Back
    </NuxtLink>

    <div class="project-detail-heading" :style="{ '--project-accent': project.accent }">
      <p class="eyebrow">{{ project.type }}</p>
      <h1>{{ project.title }}</h1>
      <p>{{ project.detail }}</p>
      <a class="project-demo-button" :href="project.liveUrl" aria-label="Open live demo">
        <span class="material-symbols-rounded" aria-hidden="true">rocket_launch</span>
        Live Demo
      </a>
    </div>

    <div class="project-detail-visual">
      <img :src="project.image" :alt="`${project.title} project preview`" />
    </div>

    <div class="project-detail-meta">
      <h2>Technologies</h2>
      <div class="project-tech-list" aria-label="Technologies">
        <span v-for="technology in project.technologies" :key="technology">{{ technology }}</span>
      </div>
    </div>
  </section>

  <section v-else class="project-detail-page reveal-on-scroll is-visible">
    <NuxtLink class="back-button" to="/my-projects">
      <span class="material-symbols-rounded" aria-hidden="true">arrow_back</span>
      Back
    </NuxtLink>
    <div class="project-detail-heading">
      <p class="eyebrow">Project</p>
      <h1>Project Not Found</h1>
      <p>The project you are looking for is no longer available.</p>
    </div>
  </section>
</template>
