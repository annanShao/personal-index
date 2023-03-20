import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Home = () => import('@/components/pages/home')
const Papers = () => import('@/components/pages/papers')
const NotFound = () => import('@/components/pages/404')

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
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as RouteRecordRaw[]
})
