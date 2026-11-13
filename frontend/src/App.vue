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
      </nav>
    </header>

    <RouterView />
  </div>
</template>
