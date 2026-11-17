<script setup>
import { onMounted, ref } from 'vue';

import {
  obtenerCamas,
  crearCama,
  asignarCama,
  darAltaCama,
  finalizarLimpieza,
  bloquearCama,
  desbloquearCama,
} from '../services/camas.service';

const camas = ref([]);
const error = ref('');
const cargando = ref(false);

const nuevaCama = ref({
  numero: '',
  sector: '',
});

const pacientePorCama = ref({});
const tipoIngresoPorCama = ref({});

async function cargarCamas() {
  cargando.value = true;
  error.value = '';

  try {
    camas.value = await obtenerCamas();
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
}

async function guardarCama() {
  error.value = '';

  try {
    await crearCama({
      numero: nuevaCama.value.numero,
      sector: nuevaCama.value.sector,
    });

    nuevaCama.value = {
      numero: '',
      sector: '',
    };

    await cargarCamas();
  } catch (err) {
    error.value = err.message;
  }
}

async function asignar(cama) {
  error.value = '';

  try {
    await asignarCama(
      cama.id,
      pacientePorCama.value[cama.id],
      tipoIngresoPorCama.value[cama.id],
    );

    pacientePorCama.value[cama.id] = '';
    tipoIngresoPorCama.value[cama.id] = '';

    await cargarCamas();
  } catch (err) {
    error.value = err.message;
  }
}

async function darAlta(cama) {
  try {
    await darAltaCama(cama.id);
    await cargarCamas();
  } catch (err) {
    error.value = err.message;
  }
}

async function terminarLimpieza(cama) {
  try {
    await finalizarLimpieza(cama.id);
    await cargarCamas();
  } catch (err) {
    error.value = err.message;
  }
}

async function bloquear(cama) {
  try {
    await bloquearCama(cama.id);
    await cargarCamas();
  } catch (err) {
    error.value = err.message;
  }
}

async function desbloquear(cama) {
  try {
    await desbloquearCama(cama.id);
    await cargarCamas();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  cargarCamas();
});
</script>

<template>
  <main>
    <h1>Camas</h1>

    <section>
      <h2>Nueva cama</h2>

      <form @submit.prevent="guardarCama">
        <div>
          <label>Número</label>
          <input
            v-model="nuevaCama.numero"
            type="text"
            required
          />
        </div>

        <div>
          <label>Sector</label>
          <input
            v-model="nuevaCama.sector"
            type="text"
            required
          />
        </div>

        <button type="submit">
          Crear cama
        </button>
      </form>
    </section>

    <p v-if="error">
      {{ error }}
    </p>

    <p v-if="cargando">
      Cargando camas...
    </p>

    <section v-else>
      <h2>Listado de camas</h2>

      <table v-if="camas.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Sector</th>
            <th>Estado</th>
            <th>Paciente</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="cama in camas"
            :key="cama.id"
          >
            <td>{{ cama.id }}</td>
            <td>{{ cama.numero }}</td>
            <td>{{ cama.sector }}</td>
            <td>
              <span
                class="estado-badge"
                :class="{
                  'estado-libre': cama.estado === 'Libre',
                  'estado-ocupada': cama.estado === 'Ocupada',
                  'estado-limpieza': cama.estado === 'En limpieza',
                  'estado-bloqueada': cama.estado === 'Bloqueada',
                }"
              >
                {{ cama.estado }}
              </span>
            </td>

            <td>
              {{ cama.pacienteId || '-' }}
            </td>

            <td>
              <div v-if="cama.estado === 'Libre'">
                <input
                  v-model="pacientePorCama[cama.id]"
                  type="number"
                  placeholder="ID paciente"
                />
                <select
                  v-model="tipoIngresoPorCama[cama.id]"
                  required
                >
                  <option value="">
                    Seleccionar ingreso
                  </option>

                  <option value="PREQUIRURGICO">
                    Pre-quirúrgico
                  </option>
                  <option value="RESPIRATORIO">
                    Infección respiratoria
                  </option>
                </select>

                <button
                  type="button"
                  @click="asignar(cama)"
                >
                  Asignar
                </button>

                <button
                  type="button"
                  @click="bloquear(cama)"
                >
                  Bloquear
                </button>
              </div>

              <button
                v-if="cama.estado === 'Ocupada'"
                type="button"
                @click="darAlta(cama)"
              >
                Dar alta
              </button>

              <button
                v-if="cama.estado === 'En limpieza'"
                type="button"
                @click="terminarLimpieza(cama)"
              >
                Finalizar limpieza
              </button>

              <button
                v-if="cama.estado === 'Bloqueada'"
                type="button"
                @click="desbloquear(cama)"
              >
                Desbloquear
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay camas registradas.
      </p>
    </section>
  </main>
</template>
