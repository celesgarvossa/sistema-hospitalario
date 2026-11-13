import { createRouter, createWebHistory } from 'vue-router';

import PacientesView from '../views/PacientesView.vue';
import CamasView from '../views/CamasView.vue';

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL,
  ),

  routes: [
    {
      path: '/',
      redirect: '/pacientes',
    },

    {
      path: '/pacientes',
      name: 'pacientes',
      component: PacientesView,
    },

    {
      path: '/camas',
      name: 'camas',
      component: CamasView,
    },
  ],
});

export default router;
