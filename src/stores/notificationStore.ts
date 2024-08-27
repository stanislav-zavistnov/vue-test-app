import { INotification, NotificationType } from '@/types'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notification: {
      message: '',
      type: 'info',
      visible: false,
    } as INotification,
  }),
  actions: {
    showNotification (message: string, type: NotificationType) {
      this.notification.message = message
      this.notification.type = type
      this.notification.visible = true

      setTimeout(() => {
        this.notification.visible = false
      }, 3000)
    },
  },
})
