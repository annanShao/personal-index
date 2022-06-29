import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Home = () => import('@/components/pages/home')
const Papers = () => import('@/components/pages/papers')

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/papers',
    component: Papers,
    name: 'Papers'
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[]
})
