<script setup>
import SiteNavigation from '../components/SiteNavigation.vue'
import CardComponent from '@/components/CardComponent.vue'
</script>

<template>
  <main>
    <CardComponent
      card.image="../src/assets/images/bellpepper.webp"
      card-title="Spinat"
      card-link="/plantspecies/view/Spinat"
    />
  </main>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>
