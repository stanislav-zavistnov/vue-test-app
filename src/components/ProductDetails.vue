<template>
  <v-container class="w-100">
    <v-card v-if="product" class="my-4">
      <div class="title-wrap">
        <v-card-title>
          <h1 class="title">{{ product.title }}</h1>
        </v-card-title>
        <RedirectButton>
          Back to shop
        </RedirectButton>
      </div>
      <v-card-subtitle>
        <p>{{ product.category }}</p>
      </v-card-subtitle>
      <div class="content-wrap">
        <img alt="Product Image" class="product-image" :src="product.images[0]">
        <v-card-text>
          <p class="descr"> {{ product.description }}</p>
          <p class="another-info"><strong>Price:</strong> ${{ product.price }}</p>
          <p class="another-info"><strong>Rating:</strong> {{ product.rating }} / 5</p>
          <p class="another-info"><strong> {{ product.warrantyInformation }} </strong></p>
        </v-card-text>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { useNotificationStore } from '@/stores/notificationStore'
  import { IProduct } from '@/types'
  import { FetchProductsMethods } from '@/utils/fetchMethods'
  const route = useRoute()
  const router = useRouter()
  const isLoading = ref(true)
  const product = ref<IProduct | null>(null)
  const notificationStore = useNotificationStore()
  const id = +route.params.id
  function triggerNotification () {
    notificationStore.showNotification('Error, product not found', 'error')
  }
  onMounted(async () => {
    const result = await FetchProductsMethods.getItemById(id)
    if (!result) {
      triggerNotification()
      router.push('/products')
    } else {
      product.value = result
      isLoading.value = false
    }
  })
</script>

<style scoped>

.title-wrap {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.title {
  color: #fff;
}

.product-image {
  align-self: start;
  min-width: 400px;
  max-width: 400px;
  min-height: 400px;
  max-height: 500px;
}

.content-wrap {
  display: flex;
  flex-wrap: nowrap;
}

.descr {
  margin-bottom: 10px;
  font-size: 30px;
}

.another-info {
  font-size: 20px;
}
</style>
