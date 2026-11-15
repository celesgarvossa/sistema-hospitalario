import { createRouter, createWebHistory } from 'vue-router';

import PacientesView from '../views/PacientesView.vue';
import CamasView from '../views/CamasView.vue';
import MedicacionView from '../views/MedicacionView.vue';
import FacturacionView from '../views/FacturacionView.vue';
import SignosVitalesView from '../views/SignosVitalesView.vue';

import TriageView from '../views/TriageView.vue';
import TurnosView from '../views/TurnosView.vue';
import ProtocolosView from '../views/ProtocolosView.vue';
import AgendasView from '../views/AgendasView.vue';

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

    {
      path: '/medicacion',
      name: 'medicacion',
      component: MedicacionView,
    },

    {
      path: '/facturacion',
      name: 'facturacion',
      component: FacturacionView,
    },

    {
      path: '/signos-vitales',
      name: 'signos-vitales',
      component: SignosVitalesView,
    },

    {
      path: '/triage',
      name: 'triage',
      component: TriageView,
    },

    {
      path: '/turnos',
      name: 'turnos',
      component: TurnosView,
    },

    {
      path: '/protocolos',
      name: 'protocolos',
      component: ProtocolosView,
    },

    {
      path: '/agendas',
      name: 'agendas',
      component: AgendasView,
    },
  ],

});

export default router;
