import MainPage from '@/components/MainPage.vue'
import NotFound from '@/components/NotFound.vue'
import ProductDetails from '@/components/ProductDetails.vue'
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      name: 'MainPage',
      path: '/products',
      component: MainPage,
    },
    {
      name: 'ProductDetails',
      path: '/products/:id',
      component: ProductDetails,
    },
    {
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],
})
