<script setup>
import { ref } from 'vue';

import {
  obtenerProtocoloPreoperatorio,
  obtenerProtocoloRespiratorio,
} from '../services/protocolos.service';

const protocolo = ref(null);
const cargando = ref(false);
const error = ref('');

async function cargarPreoperatorio() {
  cargando.value = true;
  error.value = '';

  try {
    protocolo.value = await obtenerProtocoloPreoperatorio();
  } catch (err) {
    console.error(err);
    error.value = 'No se pudo obtener el protocolo preoperatorio.';
  } finally {
    cargando.value = false;
  }
}

async function cargarRespiratorio() {
  cargando.value = true;
  error.value = '';

  try {
    protocolo.value = await obtenerProtocoloRespiratorio();
  } catch (err) {
    console.error(err);
    error.value = 'No se pudo obtener el protocolo respiratorio.';
  } finally {
    cargando.value = false;
  }
}
</script>

<template>
  <main>
    <h2>Protocolos de Atención</h2>

    <section>
      <h3>Seleccionar protocolo</h3>

      <button
        type="button"
        @click="cargarPreoperatorio"
      >
        Protocolo preoperatorio
      </button>

      <button
        type="button"
        @click="cargarRespiratorio"
      >
        Protocolo respiratorio
      </button>
    </section>

    <p v-if="cargando">
      Cargando protocolo...
    </p>

    <p v-if="error">
      {{ error }}
    </p>

    <section v-if="protocolo">
      <h3>{{ protocolo.nombre }}</h3>

      <ol>
        <li
          v-for="(paso, index) in protocolo.pasos"
          :key="index"
        >
          {{ paso }}
        </li>
      </ol>
    </section>
  </main>
</template>
