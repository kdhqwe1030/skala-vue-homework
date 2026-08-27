import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'
import WeatherAboutView from '@/views/WeatherAboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import WeatherDetailView from '@/views/WeatherDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WeatherHomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: WeatherAboutView,
    },
    {
      path: '/weather/:cityId',
      name: 'weather',
      component: WeatherDetailView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

export default router
