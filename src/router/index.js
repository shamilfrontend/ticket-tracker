import Vue from 'vue';
import VueRouter from 'vue-router';

// pages
import Create from '../pages/Create/index.vue';
import TicketList from '../pages/TicketList/index.vue';
import DetailTicket from '../pages/DetailTicket/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'create',
    component: Create,
  },
  {
    path: '/tickets',
    name: 'list',
    component: TicketList,
  },
  {
    path: '/ticket/:id',
    name: 'ticket',
    component: DetailTicket,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
