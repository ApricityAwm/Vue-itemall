import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/home')
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('@/views/category')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('@/views/cart')
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('@/views/profile')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
