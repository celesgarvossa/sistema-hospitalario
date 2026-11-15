<script setup>
import { onMounted, ref } from 'vue';

import {
  obtenerAgendas,
  crearAgenda,
} from '../services/agendas.service';

const agendas = ref([]);

const medicoId = ref('');
const fecha = ref('');
const activa = ref(true);

const error = ref('');
const mensaje = ref('');

async function cargarAgendas() {
  try {
    agendas.value = await obtenerAgendas();
  } catch (err) {
    console.error(err);
    error.value = 'No se pudieron cargar las agendas.';
  }
}

async function guardarAgenda() {
  error.value = '';
  mensaje.value = '';

  try {
    await crearAgenda({
      medicoId: Number(medicoId.value),
      fecha: fecha.value,
      activa: activa.value,
    });

    mensaje.value = 'Agenda creada correctamente.';

    medicoId.value = '';
    fecha.value = '';
    activa.value = true;

    await cargarAgendas();
  } catch (err) {
    console.error(err);
    error.value =
      err?.message || 'No se pudo crear la agenda.';
  }
}

onMounted(() => {
  cargarAgendas();
});
</script>

<template>
  <main>
    <h2>Agendas</h2>

    <section>
      <h3>Nueva agenda</h3>

      <div>
        <label>
          ID médico
          <input
            v-model="medicoId"
            type="number"
            min="1"
          />
        </label>
      </div>

      <div>
        <label>
          Fecha
          <input
            v-model="fecha"
            type="date"
          />
        </label>
      </div>

      <div>
        <label>
          <input
            v-model="activa"
            type="checkbox"
          />
          Activa
        </label>
      </div>

      <button
        type="button"
        @click="guardarAgenda"
      >
        Crear agenda
      </button>

      <p v-if="mensaje">
        {{ mensaje }}
      </p>

      <p v-if="error">
        {{ error }}
      </p>
    </section>

    <section>
      <h3>Listado de agendas</h3>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID médico</th>
            <th>Fecha</th>
            <th>Activa</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="agenda in agendas"
            :key="agenda.id"
          >
            <td>{{ agenda.id }}</td>
            <td>{{ agenda.medicoId }}</td>
            <td>{{ agenda.fecha }}</td>
            <td>{{ agenda.activa ? 'Sí' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
