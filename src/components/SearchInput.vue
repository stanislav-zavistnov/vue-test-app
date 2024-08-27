<template>
  <div>
    <v-container>
      <v-text-field v-model="textInput" label="Input product name" outlined />
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits } from 'vue'

  const emit = defineEmits<{(e: 'search', value: string): void}>()

  const textInput = ref<string>('')
  let typingTimer: ReturnType<typeof setTimeout> | null = null

  const onSearch = () => {
    emit('search', textInput.value)
  }

  watch(textInput, () => {
    if (typingTimer) {
      clearTimeout(typingTimer)
    }
    typingTimer = setTimeout(() => {
      onSearch()
    }, 400)
  })

  onUnmounted(() => {
    if (typingTimer) {
      clearTimeout(typingTimer)
    }
  })

</script>
