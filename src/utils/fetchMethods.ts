import { IGetProductOptions, IProduct, IProductPage } from '@/types'

const BASE_URL = 'https://dummyjson.com'

export class FetchProductsMethods {
  static async getProductPage (options: IGetProductOptions): Promise<IProductPage | undefined> {
    const path = options.q ? 'products/search' : 'products'
    const url = new URL(path, BASE_URL)
    Object.entries(options).forEach(([k, v]) => {
      if (v != null) {
        url.searchParams.append(k, v)
      }
    })
    try {
      const response = await fetch(url, { method: 'get' })
      const resultObj: IProductPage = await response.json()
      return resultObj
    } catch (error) {
      console.error('Fetch products error: ', error)
    }
  }

  static async getItemById (id: number): Promise<IProduct | undefined> {
    const url = new URL(`products/${id}`, BASE_URL)
    try {
      const response = await fetch(url, { method: 'get' })
      if (response.ok) {
        const result: IProduct = await response.json()
        return result
      } else {
        const errorData = await response.json()
        throw new Error(`${errorData.message}`)
      }
    } catch (error) {
      console.error('Fetch products error: ', error)
    }
  }
}
