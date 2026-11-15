<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div>
    <header>
      <h1>Sistema Hospitalario</h1>

      <nav>
        <RouterLink to="/pacientes">
          Pacientes
        </RouterLink>

        <span> | </span>

        <RouterLink to="/camas">
          Camas
        </RouterLink>

        <RouterLink to="/medicacion">
          Medicación e Inventario
        </RouterLink>

        <span> | </span>

        <RouterLink to="/facturacion">
          Facturación
        </RouterLink>

        <span> | </span>
        <RouterLink to="/signos-vitales">
          Signos Vitales
        </RouterLink>

        <span> | </span>

        <RouterLink to="/triage">
          Triage
        </RouterLink>

        <span> | </span>

        <RouterLink to ="/turnos">
          Turnos
        </RouterLink>

        <span> | </span>

        <RouterLink to="/protocolos">
          Protocolos
        </RouterLink>

        <span> | </span>

        <RouterLink to="/agendas">
          Agendas
        </RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
