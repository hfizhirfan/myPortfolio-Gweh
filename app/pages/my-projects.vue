<script setup lang="ts">
import { projects } from '../data/projects'
</script>

<template>
  <section class="projects-page reveal-on-scroll is-visible">
    <div class="projects-page-heading">
      <p class="eyebrow">Projects</p>
      <h1>Selected Work Built Across Code, Design, and Digital Systems</h1>
      <p>
        A collection of web, UI/UX, and information system projects I have developed, designed, or contributed to.
      </p>
    </div>

    <div class="projects-page-grid">
      <NuxtLink
        v-for="project in projects"
        :key="project.slug"
        class="project-showcase-card"
        :to="`/my-projects/${project.slug}`"
        :style="{ '--project-accent': project.accent }"
      >
        <div class="project-showcase-media">
          <img :src="project.image" :alt="`${project.title} project preview`" />
        </div>
        <div class="project-showcase-body">
          <p>{{ project.type }}</p>
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <div class="project-tech-list" aria-label="Technologies">
            <span v-for="technology in project.technologies" :key="technology">{{ technology }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
