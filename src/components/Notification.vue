<template>
  <transition mode="out-in" name="fade">
    <div v-if="notification.visible" class="notification-wrap" :class="notificationClass">
      <span class="notification-text">
        {{ notification.message }}
      </span>
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { useNotificationStore } from '@/stores/notificationStore'

  const notificationStore = useNotificationStore()

  const notification = computed(() => notificationStore.notification)
  const notificationClass = computed(() => {
    switch (notification.value.type) {
      case 'success':
        return 'notification-success'
      case 'error':
        return 'notification-error'
      case 'warning':
        return 'notification-warning'
      case 'info':
      default:
        return 'notification-info'
    }
  })
</script>

<style scoped>
.notification-wrap {
  position: fixed;
  top: 5%;
  right: 5%;
  z-index: 1000;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.notification-success {
  background-color: #4caf50;
}

.notification-error {
  background-color: #f44336;
}

.notification-warning {
  background-color: #ff9800;
}

.notification-info {
  background-color: #2196f3;
}
</style>
