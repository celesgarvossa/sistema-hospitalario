<script setup>
import { onMounted, ref } from 'vue';
import {
  obtenerPacientes,
  crearPaciente,
} from '../services/pacientes.service';

const pacientes = ref([]);
const cargando = ref(false);
const error = ref('');

const formulario = ref({
  nombre: '',
  apellido: '',
  documento: '',
  fechaNacimiento: '',
});

async function cargarPacientes() {
  cargando.value = true;
  error.value = '';

  try {
    pacientes.value = await obtenerPacientes();
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
}

async function guardarPaciente() {
  error.value = '';

  try {
    await crearPaciente({
      nombre: formulario.value.nombre,
      apellido: formulario.value.apellido,
      documento: formulario.value.documento,
      fechaNacimiento:
        formulario.value.fechaNacimiento || null,
    });

    formulario.value = {
      nombre: '',
      apellido: '',
      documento: '',
      fechaNacimiento: '',
    };

    await cargarPacientes();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  cargarPacientes();
});
</script>

<template>
  <main>
    <h1>Pacientes</h1>

    <section>
      <h2>Nuevo paciente</h2>

      <form @submit.prevent="guardarPaciente">
        <div>
          <label>Nombre</label>
          <input
            v-model="formulario.nombre"
            type="text"
            required
          />
        </div>

        <div>
          <label>Apellido</label>
          <input
            v-model="formulario.apellido"
            type="text"
            required
          />
        </div>

        <div>
          <label>Documento</label>
          <input
            v-model="formulario.documento"
            type="text"
            required
          />
        </div>

        <div>
          <label>Fecha de nacimiento</label>
          <input
            v-model="formulario.fechaNacimiento"
            type="date"
          />
        </div>

        <button type="submit">
          Guardar paciente
        </button>
      </form>
    </section>

    <p v-if="error">
      {{ error }}
    </p>

    <p v-if="cargando">
      Cargando pacientes...
    </p>

    <section v-else>
      <h2>Listado de pacientes</h2>

      <table v-if="pacientes.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Fecha de nacimiento</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="paciente in pacientes"
            :key="paciente.id"
          >
            <td>{{ paciente.id }}</td>
            <td>{{ paciente.nombre }}</td>
            <td>{{ paciente.apellido }}</td>
            <td>{{ paciente.documento }}</td>
            <td>
              {{ paciente.fechaNacimiento || '-' }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay pacientes registrados.
      </p>
    </section>
  </main>
</template>
