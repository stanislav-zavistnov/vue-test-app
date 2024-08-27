import { IGetProductOptions, IProduct } from '@/types'
import { defineStore } from 'pinia'
import { FetchProductsMethods } from '@/utils/fetchMethods'

export const useAppStore = defineStore('app', {
  state: () => ({
    products: [] as IProduct[],
    total: 0,
    limit: 0,
    skip: 0,
  }),
  actions: {
    async getProducts (options: IGetProductOptions) {
      const data = await FetchProductsMethods.getProductPage(options)
      if (data !== undefined) {
        this.products = data.products
        this.total = data.total
        this.skip = data.skip
      }
    },
  },
})
