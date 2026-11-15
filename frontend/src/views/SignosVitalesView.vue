<script setup>
import { onMounted, ref } from 'vue';

import {
  obtenerSignosVitales,
  registrarSignosVitales,
} from '../services/signos-vitales.service';

const registros = ref([]);
const error = ref('');
const cargando = ref(false);

const formulario = ref({
  pacienteId: '',
  temperatura: '',
  presionSistolica: '',
  presionDiastolica: '',
  frecuenciaCardiaca: '',
  saturacionOxigeno: '',
});

async function cargarRegistros() {
  cargando.value = true;
  error.value = '';

  try {
    registros.value =
      await obtenerSignosVitales();
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
}

async function guardarSignosVitales() {
  error.value = '';

  try {
    await registrarSignosVitales({
      pacienteId: Number(
        formulario.value.pacienteId,
      ),

      temperatura:
        formulario.value.temperatura !== ''
          ? Number(formulario.value.temperatura)
          : null,

      presionSistolica:
        formulario.value.presionSistolica !== ''
          ? Number(formulario.value.presionSistolica)
          : null,

      presionDiastolica:
        formulario.value.presionDiastolica !== ''
          ? Number(formulario.value.presionDiastolica)
          : null,

      frecuenciaCardiaca:
        formulario.value.frecuenciaCardiaca !== ''
          ? Number(formulario.value.frecuenciaCardiaca)
          : null,

      saturacionOxigeno:
        formulario.value.saturacionOxigeno !== ''
          ? Number(formulario.value.saturacionOxigeno)
          : null,
    });

    formulario.value = {
      pacienteId: '',
      temperatura: '',
      presionSistolica: '',
      presionDiastolica: '',
      frecuenciaCardiaca: '',
      saturacionOxigeno: '',
    };

    await cargarRegistros();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  cargarRegistros();
});
</script>

<template>
  <main>
    <h1>Signos Vitales</h1>

    <p v-if="error">
      {{ error }}
    </p>

    <section>
      <h2>Nuevo registro</h2>

      <form @submit.prevent="guardarSignosVitales">
        <div>
          <label>ID paciente</label>
          <input
            v-model="formulario.pacienteId"
            type="number"
            required
          />
        </div>

        <div>
          <label>Temperatura (°C)</label>
          <input
            v-model="formulario.temperatura"
            type="number"
            step="0.1"
          />
        </div>

        <div>
          <label>Presión sistólica</label>
          <input
            v-model="formulario.presionSistolica"
            type="number"
          />
        </div>

        <div>
          <label>Presión diastólica</label>
          <input
            v-model="formulario.presionDiastolica"
            type="number"
          />
        </div>

        <div>
          <label>Frecuencia cardíaca</label>
          <input
            v-model="formulario.frecuenciaCardiaca"
            type="number"
          />
        </div>

        <div>
          <label>Saturación de oxígeno</label>
          <input
            v-model="formulario.saturacionOxigeno"
            type="number"
          />
        </div>

        <button type="submit">
          Registrar signos vitales
        </button>
      </form>
    </section>

    <section>
      <h2>Registros</h2>

      <p v-if="cargando">
        Cargando registros...
      </p>

      <table v-else-if="registros.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Temperatura</th>
            <th>Presión</th>
            <th>Frecuencia cardíaca</th>
            <th>Saturación</th>
            <th>Alerta</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="registro in registros"
            :key="registro.id"
          >
            <td>{{ registro.id }}</td>
            <td>{{ registro.pacienteId }}</td>

            <td>
              {{
                registro.temperatura ?? '-'
              }}
            </td>

            <td>
              {{
                registro.presionSistolica ?? '-'
              }}
              /
              {{
                registro.presionDiastolica ?? '-'
              }}
            </td>

            <td>
              {{
                registro.frecuenciaCardiaca ?? '-'
              }}
            </td>

            <td>
              {{
                registro.saturacionOxigeno ?? '-'
              }}
            </td>

            <td>
              <span
                class="estado-badge"
                :class="registro.alertaTemperatura ? 'estado-alerta' : 'estado-normal'"
              >
                {{ registro.alertaTemperatura ? 'ALERTA' : 'Normal' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay signos vitales registrados.
      </p>
    </section>
  </main>
</template>
