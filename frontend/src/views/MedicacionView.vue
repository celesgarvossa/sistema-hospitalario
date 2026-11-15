<script setup>
import { onMounted, ref } from 'vue';

import {
  obtenerAdministraciones,
  administrarMedicacion,
} from '../services/medicacion.service';

import {
  obtenerMedicamentos,
  crearMedicamento,
} from '../services/inventario.service';

const medicamentos = ref([]);
const administraciones = ref([]);

const error = ref('');
const cargando = ref(false);

const nuevoMedicamento = ref({
  nombre: '',
  descripcion: '',
  stock: 0,
});

const nuevaAdministracion = ref({
  pacienteId: '',
  medicamentoId: '',
  enfermeroId: '',
  cantidad: 1,
  horarioProgramado: '',
  horarioAdministracion: '',
  tipoCobertura: 'PARTICULAR',
  montoBase: 0,
});

async function cargarDatos() {
  cargando.value = true;
  error.value = '';

  try {
    medicamentos.value =
      await obtenerMedicamentos();

    administraciones.value =
      await obtenerAdministraciones();
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
}

async function guardarMedicamento() {
  error.value = '';

  try {
    await crearMedicamento({
      nombre: nuevoMedicamento.value.nombre,
      descripcion:
        nuevoMedicamento.value.descripcion || null,
      stock: Number(
        nuevoMedicamento.value.stock,
      ),
    });

    nuevoMedicamento.value = {
      nombre: '',
      descripcion: '',
      stock: 0,
    };

    await cargarDatos();
  } catch (err) {
    error.value = err.message;
  }
}

async function guardarAdministracion() {
  error.value = '';

  try {
    await administrarMedicacion({
      pacienteId: Number(
        nuevaAdministracion.value.pacienteId,
      ),

      medicamentoId: Number(
        nuevaAdministracion.value.medicamentoId,
      ),

      enfermeroId: Number(
        nuevaAdministracion.value.enfermeroId,
      ),

      cantidad: Number(
        nuevaAdministracion.value.cantidad,
      ),

      horarioProgramado:
        nuevaAdministracion.value.horarioProgramado,

      horarioAdministracion:
        nuevaAdministracion.value.horarioAdministracion,

      tipoCobertura:
        nuevaAdministracion.value.tipoCobertura,

      montoBase: Number(
        nuevaAdministracion.value.montoBase,
      ),
    });

    nuevaAdministracion.value = {
      pacienteId: '',
      medicamentoId: '',
      enfermeroId: '',
      cantidad: 1,
      horarioProgramado: '',
      horarioAdministracion: '',
      tipoCobertura: 'PARTICULAR',
      montoBase: 0,
    };

    await cargarDatos();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  cargarDatos();
});
</script>

<template>
  <main>
    <h1>Medicación e Inventario</h1>

    <p v-if="error">
      {{ error }}
    </p>

    <section>
      <h2>Nuevo medicamento</h2>

      <form @submit.prevent="guardarMedicamento">
        <div>
          <label>Nombre</label>
          <input
            v-model="nuevoMedicamento.nombre"
            type="text"
            required
          />
        </div>

        <div>
          <label>Descripción</label>
          <input
            v-model="nuevoMedicamento.descripcion"
            type="text"
          />
        </div>

        <div>
          <label>Stock inicial</label>
          <input
            v-model="nuevoMedicamento.stock"
            type="number"
            min="0"
            required
          />
        </div>

        <button type="submit">
          Crear medicamento
        </button>
      </form>
    </section>

    <section>
      <h2>Inventario</h2>

      <p v-if="cargando">
        Cargando...
      </p>

      <table v-else-if="medicamentos.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Medicamento</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Activo</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="medicamento in medicamentos"
            :key="medicamento.id"
          >
            <td>{{ medicamento.id }}</td>
            <td>{{ medicamento.nombre }}</td>
            <td>
              {{ medicamento.descripcion || '-' }}
            </td>
            <td>{{ medicamento.stock }}</td>
            <td>
              {{ medicamento.activo ? 'Sí' : 'No' }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay medicamentos registrados.
      </p>
    </section>

    <section>
      <h2>Administrar medicación</h2>

      <form @submit.prevent="guardarAdministracion">
        <div>
          <label>ID paciente</label>
          <input
            v-model="nuevaAdministracion.pacienteId"
            type="number"
            required
          />
        </div>

        <div>
          <label>Medicamento</label>

          <select
            v-model="nuevaAdministracion.medicamentoId"
            required
          >
            <option value="">
              Seleccionar
            </option>

            <option
              v-for="medicamento in medicamentos"
              :key="medicamento.id"
              :value="medicamento.id"
            >
              {{ medicamento.nombre }}
              - Stock: {{ medicamento.stock }}
            </option>
          </select>
        </div>

        <div>
          <label>ID enfermero</label>
          <input
            v-model="nuevaAdministracion.enfermeroId"
            type="number"
            required
          />
        </div>

        <div>
          <label>Cantidad</label>
          <input
            v-model="nuevaAdministracion.cantidad"
            type="number"
            min="1"
            required
          />
        </div>

        <div>
          <label>Horario programado</label>
          <input
            v-model="nuevaAdministracion.horarioProgramado"
            type="datetime-local"
            required
          />
        </div>

        <div>
          <label>Horario de administración</label>
          <input
            v-model="nuevaAdministracion.horarioAdministracion"
            type="datetime-local"
            required
          />
        </div>

        <div>
          <label>Tipo de cobertura</label>

          <select
            v-model="nuevaAdministracion.tipoCobertura"
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
          <label>Monto base</label>
          <input
            v-model="nuevaAdministracion.montoBase"
            type="number"
            min="0"
            required
          />
        </div>

        <button type="submit">
          Registrar administración
        </button>
      </form>
    </section>

    <section>
      <h2>Administraciones registradas</h2>

      <table v-if="administraciones.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Paciente</th>
            <th>Medicamento</th>
            <th>Enfermero</th>
            <th>Cantidad</th>
            <th>Dentro de ventana</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="administracion in administraciones"
            :key="administracion.id"
          >
            <td>{{ administracion.id }}</td>
            <td>{{ administracion.pacienteId }}</td>
            <td>{{ administracion.medicamentoId }}</td>
            <td>{{ administracion.enfermeroId }}</td>
            <td>{{ administracion.cantidad }}</td>
            <td>
              {{
                administracion.dentroVentana
                  ? 'Sí'
                  : 'No'
              }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay administraciones registradas.
      </p>
    </section>
  </main>
</template>
