<template>
  <v-btn class="btn-text" @click="goToProducts">
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
  const router = useRouter()
  const goToProducts = () => {
    router.push('/products')
  }
</script>
