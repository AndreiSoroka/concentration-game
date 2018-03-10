import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const IndexPage = () => import(/* webpackChunkName: "IndexPage" */ '../vue/pages/Index/index.vue');
const Game = () => import(/* webpackChunkName: "NotFoundPage" */ '../vue/pages/Game/index.vue');
const NotFoundPage = () => import(/* webpackChunkName: "NotFoundPage" */ '../vue/pages/NotFound/index.vue');


const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  },
  {
    path: '/game/level/:level/size/:size',
    name: 'game',
    component: Game
  },
  {
    path: '*',
    name: 'nf',
    component: NotFoundPage
  }
];


export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active active',
  routes
});
