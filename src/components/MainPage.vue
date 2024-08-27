<template>
  <h1 class="title">Amazberries-express - shop</h1>
  <SearchInput @search="handleSearch" />
  <div v-if="isLoading">Loading...</div>
  <v-data-table
    v-if="!isLoading"
    :headers="headers"
    :items="products"
    :items-per-page="itemsPerPage"
  >
    <template #item="{ item }">
      <tr class="row" @click="handleRowClick(item.id)">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.rating }}</td>
        <td>{{ item.price }}</td>
      </tr>
    </template>
    <template #top>
      <v-select
        class="pa-2"
        hide-details
        :items="[10, 20, 30]"
        label="Items per page"
        :model-value="itemsPerPage"
        @update:model-value="updateItemsPerPage"
      />
    </template>

    <template #bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount" />
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
  import { useAppStore } from '@/stores/app'

  export default defineComponent({
    setup () {
      const page = ref(1)
      const itemsPerPage = ref(10)
      const searchValue = ref('')
      const isLoading = ref(true)
      const store = useAppStore()
      const router = useRouter()

      const products = computed(() => store.products)
      const total = computed(() => store.total)

      const headers = [
        { title: 'ID', value: 'id' },
        { title: 'Product Name', value: 'title' },
        { title: 'Rating', value: 'rating' },
        { title: 'Price', value: 'price' },
      ]

      const pageCount = computed(() => {
        return Math.ceil(total.value / itemsPerPage.value)
      })

      const fetchData = async () => {
        const skip = (page.value - 1) * itemsPerPage.value
        try {
          await store.getProducts({ skip, limit: itemsPerPage.value, q: searchValue.value })
          isLoading.value = false
        } catch (error) {
          console.error('Fetch products error: ', error)
        }
      }

      const updateItemsPerPage = (value: number) => {
        itemsPerPage.value = value
        page.value = 1
      }

      watch([page, itemsPerPage], () => {
        fetchData()
      })

      onMounted(async () => {
        await fetchData()
      })

      const handleRowClick = (id: number) => {
        router.push(`/products/${id}`)
      }

      const handleSearch = (inputData: string) => {
        searchValue.value = inputData
        if (page.value !== 1) {
          page.value = 1
        } else {
          fetchData()
        }
      }

      return {
        page,
        itemsPerPage,
        headers,
        products,
        pageCount,
        handleRowClick,
        fetchData,
        updateItemsPerPage,
        handleSearch,
        searchValue,
        isLoading,
      }
    },
  })
</script>

<style scoped>
.text {
  color: #ffffff;
}

.row {
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.row:hover {
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}
</style>
