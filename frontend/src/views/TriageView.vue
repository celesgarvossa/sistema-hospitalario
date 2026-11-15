<script setup>
import { onMounted, ref } from 'vue';

import {
  obtenerTriage,
  registrarTriage,
} from '../services/triage.service';

const registros = ref([]);
const error = ref('');
const cargando = ref(false);

const formulario = ref({
  pacienteId: '',
  codigo: 'VERDE',
});

async function cargarTriage() {
  cargando.value = true;
  error.value = '';

  try {
    registros.value = await obtenerTriage();
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
}

async function guardarTriage() {
  error.value = '';

  try {
    await registrarTriage({
      pacienteId: Number(
        formulario.value.pacienteId,
      ),
      codigo: formulario.value.codigo,
    });

    formulario.value = {
      pacienteId: '',
      codigo: 'VERDE',
    };

    await cargarTriage();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  cargarTriage();
});
</script>

<template>
  <main>
    <h1>Triage</h1>

    <p v-if="error">
      {{ error }}
    </p>

    <section>
      <h2>Registrar paciente</h2>

      <form @submit.prevent="guardarTriage">
        <div>
          <label>ID paciente</label>

          <input
            v-model="formulario.pacienteId"
            type="number"
            required
          />
        </div>

        <div>
          <label>Código</label>

          <select
            v-model="formulario.codigo"
            required
          >
            <option value="ROJO">
              Rojo
            </option>

            <option value="AMARILLO">
              Amarillo
            </option>

            <option value="VERDE">
              Verde
            </option>
          </select>
        </div>

        <button type="submit">
          Registrar triage
        </button>
      </form>
    </section>

    <section>
      <h2>Cola de atención</h2>

      <p v-if="cargando">
        Cargando triage...
      </p>

      <table v-else-if="registros.length">
        <thead>
          <tr>
            <th>Orden</th>
            <th>ID</th>
            <th>Paciente</th>
            <th>Código</th>
            <th>Prioridad</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(registro, index) in registros"
            :key="registro.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ registro.id }}</td>
            <td>{{ registro.pacienteId }}</td>
            <td>
              <span
                class="estado-badge"
                :class="{
                  'triage-rojo': registro.codigo === 'ROJO',
                  'triage-amarillo': registro.codigo === 'AMARILLO',
                  'triage-verde': registro.codigo === 'VERDE',
                }"
              >
                {{ registro.codigo }}
              </span>
            </td>
            <td>{{ registro.prioridad }}</td>
            <td>{{ registro.estado }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay pacientes en la cola de triage.
      </p>
    </section>
  </main>
</template>
