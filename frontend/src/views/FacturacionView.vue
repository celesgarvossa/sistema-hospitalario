<script setup>
import { onMounted, ref } from 'vue';

import {
  obtenerCargos,
  crearCargo,
} from '../services/facturacion.service';

const cargos = ref([]);
const error = ref('');
const cargando = ref(false);

const nuevoCargo = ref({
  pacienteId: '',
  tipoCobertura: 'PARTICULAR',
  concepto: '',
  montoBase: 0,
});

async function cargarCargos() {
  cargando.value = true;
  error.value = '';

  try {
    cargos.value = await obtenerCargos();
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
}

async function guardarCargo() {
  error.value = '';

  try {
    await crearCargo({
      pacienteId: Number(
        nuevoCargo.value.pacienteId,
      ),

      tipoCobertura:
        nuevoCargo.value.tipoCobertura,

      concepto:
        nuevoCargo.value.concepto,

      montoBase: Number(
        nuevoCargo.value.montoBase,
      ),
    });

    nuevoCargo.value = {
      pacienteId: '',
      tipoCobertura: 'PARTICULAR',
      concepto: '',
      montoBase: 0,
    };

    await cargarCargos();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  cargarCargos();
});
</script>

<template>
  <main>
    <h1>Facturación</h1>

    <p v-if="error">
      {{ error }}
    </p>

    <section>
      <h2>Nuevo cargo manual</h2>

      <form @submit.prevent="guardarCargo">
        <div>
          <label>ID paciente</label>
          <input
            v-model="nuevoCargo.pacienteId"
            type="number"
            required
          />
        </div>

        <div>
          <label>Tipo de cobertura</label>

          <select
            v-model="nuevoCargo.tipoCobertura"
            required
          >
            <option value="PUBLICO">
              Público
            </option>

            <option value="PREPAGA">
              Prepaga
            </option>

            <option value="PARTICULAR">
              Particular
            </option>
          </select>
        </div>

        <div>
          <label>Concepto</label>
          <input
            v-model="nuevoCargo.concepto"
            type="text"
            required
          />
        </div>

        <div>
          <label>Monto base</label>
          <input
            v-model="nuevoCargo.montoBase"
            type="number"
            min="0"
            required
          />
        </div>

        <button type="submit">
          Crear cargo
        </button>
      </form>
    </section>

    <section>
      <h2>Cargos registrados</h2>

      <p v-if="cargando">
        Cargando cargos...
      </p>

      <table v-else-if="cargos.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Cobertura</th>
            <th>Concepto</th>
            <th>Monto base</th>
            <th>Monto final</th>
            <th>Origen</th>
            <th>Referencia</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="cargo in cargos"
            :key="cargo.id"
          >
            <td>{{ cargo.id }}</td>
            <td>{{ cargo.pacienteId }}</td>
            <td>{{ cargo.tipoCobertura }}</td>
            <td>{{ cargo.concepto }}</td>
            <td>{{ cargo.montoBase }}</td>
            <td>{{ cargo.montoFinal }}</td>
            <td>
              {{ cargo.referenciaTipo || '-' }}
            </td>
            <td>
              {{ cargo.referenciaId || '-' }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay cargos registrados.
      </p>
    </section>
  </main>
</template>
