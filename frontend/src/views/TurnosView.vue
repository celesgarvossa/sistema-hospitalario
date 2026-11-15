<script setup>
import { onMounted, ref } from 'vue';

import {
  obtenerTurnos,
  crearTurno,
  crearEntreturno,
  confirmarTurno,
  ingresarSalaEspera,
  atenderTurno,
  cancelarTurno,
  agregarAListaEspera,
  obtenerListaEspera,
} from '../services/turnos.service';

const turnos = ref([]);
const error = ref('');
const cargando = ref(false);

const formulario = ref({
  agendaId: '',
  pacienteId: '',
  horaInicio: '',
  horaFin: '',
});

const formularioEntreturno = ref({
  agendaId: '',
  pacienteId: '',
  horaInicio: '',
  horaFin: '',
});
const listaEspera = ref([]);

const formularioListaEspera = ref({
  agendaId: '',
  pacienteId: '',
  horaInicio: '',
  horaFin: '',
});

const consultaListaEspera = ref({
  agendaId: '',
  horaInicio: '',
});

async function agregarEspera() {
  error.value = '';

  try {
    await agregarAListaEspera({
      agendaId: Number(
        formularioListaEspera.value.agendaId,
      ),
      pacienteId: Number(
        formularioListaEspera.value.pacienteId,
      ),
      horaInicio:
        formularioListaEspera.value.horaInicio,
      horaFin:
        formularioListaEspera.value.horaFin,
    });

    formularioListaEspera.value.agendaId='';
    formularioListaEspera.value.pacienteId='';
    formularioListaEspera.value.horaInicio='';
    formularioListaEspera.value.horaFin='';
  } catch (err) {
    error.value = err.message;
  }
}

async function consultarEspera() {
  error.value = '';

  try {
    listaEspera.value =
      await obtenerListaEspera(
        Number(
          consultaListaEspera.value.agendaId,
        ),
        consultaListaEspera.value.horaInicio,
      );
  } catch (err) {
    error.value = err.message;
  }
}

async function cargarTurnos() {
  cargando.value = true;
  error.value = '';

  try {
    turnos.value = await obtenerTurnos();
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
}

async function guardarTurno() {
  error.value = '';

  try {
    await crearTurno({
      agendaId: Number(
        formulario.value.agendaId,
      ),
      pacienteId: Number(
        formulario.value.pacienteId,
      ),
      horaInicio:
        formulario.value.horaInicio,
      horaFin:
        formulario.value.horaFin,
    });

    formulario.value = {
      agendaId: '',
      pacienteId: '',
      horaInicio: '',
      horaFin: '',
    };

    await cargarTurnos();
  } catch (err) {
    error.value = err.message;
  }
}

async function guardarEntreturno() {
  error.value = '';

  try {
    await crearEntreturno({
      agendaId: Number(
        formularioEntreturno.value.agendaId,
      ),
      pacienteId: Number(
        formularioEntreturno.value.pacienteId,
      ),
      horaInicio:
        formularioEntreturno.value.horaInicio,
      horaFin:
        formularioEntreturno.value.horaFin,
    });

    formularioEntreturno.value = {
      agendaId: '',
      pacienteId: '',
      horaInicio: '',
      horaFin: '',
    };

    await cargarTurnos();
  } catch (err) {
    error.value = err.message;
  }
}

async function confirmar(turno) {
  error.value = '';

  try {
    await confirmarTurno(turno.id);
    await cargarTurnos();
  } catch (err) {
    error.value = err.message;
  }
}

async function salaEspera(turno) {
  error.value = '';

  try {
    await ingresarSalaEspera(turno.id);
    await cargarTurnos();
  } catch (err) {
    error.value = err.message;
  }
}

async function atender(turno) {
  error.value = '';

  try {
    await atenderTurno(turno.id);
    await cargarTurnos();
  } catch (err) {
    error.value = err.message;
  }
}

async function cancelar(turno) {
  error.value = '';

  try {
    await cancelarTurno(turno.id);
    await cargarTurnos();
  } catch (err) {
    error.value = err.message;
  }
}

onMounted(() => {
  cargarTurnos();
});
</script>

<template>
  <main>
    <h1>Turnos</h1>

    <p v-if="error">
      {{ error }}
    </p>

    <section>
      <h2>Nuevo turno</h2>

      <form @submit.prevent="guardarTurno">
        <div>
          <label>ID agenda</label>
          <input
            v-model="formulario.agendaId"
            type="number"
            required
          />
        </div>

        <div>
          <label>ID paciente</label>
          <input
            v-model="formulario.pacienteId"
            type="number"
            required
          />
        </div>

        <div>
          <label>Hora inicio</label>
          <input
            v-model="formulario.horaInicio"
            type="time"
            required
          />
        </div>

        <div>
          <label>Hora fin</label>
          <input
            v-model="formulario.horaFin"
            type="time"
            required
          />
        </div>

        <button type="submit">
          Crear turno
        </button>
      </form>
    </section>

    <section>
      <h2>Nuevo entreturno</h2>

      <form @submit.prevent="guardarEntreturno">
        <div>
          <label>ID agenda</label>
          <input
            v-model="formularioEntreturno.agendaId"
            type="number"
            required
          />
        </div>

        <div>
          <label>ID paciente</label>
          <input
            v-model="formularioEntreturno.pacienteId"
            type="number"
            required
          />
        </div>

        <div>
          <label>Hora inicio</label>
          <input
            v-model="formularioEntreturno.horaInicio"
            type="time"
            required
          />
        </div>

        <div>
          <label>Hora fin</label>
          <input
            v-model="formularioEntreturno.horaFin"
            type="time"
            required
          />
        </div>

        <button type="submit">
          Crear entreturno
        </button>
      </form>
    </section>

    <section>
      <h2>Lista de espera</h2>
      <h3>Agregar paciente</h3>

      <form @submit.prevent="agregarEspera">
        <div>
          <label>ID agenda</label>
          <input
            v-model="formularioListaEspera.agendaId"
            type="number"
            required
          />
        </div>
        <div>
          <label>ID paciente</label>
          <input
            v-model="formularioListaEspera.pacienteId"
            type="number"
            required
          />
        </div>
        <div>
          <label>Hora inicio</label>
          <input
            v-model="formularioListaEspera.horaInicio"
            type="time"
            required
          />
        </div>
        <div>
          <label>Hora fin</label>
          <input
            v-model="formularioListaEspera.horaFin"
            type="time"
            required
          />
        </div>
        <button type="submit">
          Agregar a lista de espera
        </button>
      </form>

      <h3>Consultar lista</h3>

      <form @submit.prevent="consultarEspera">
        <div>
          <label>ID agenda</label>
          <input
            v-model="consultaListaEspera.agendaId"
            type="number"
            required
          />
        </div>

        <div>
          <label>Hora inicio</label>
          <input
            v-model="consultaListaEspera.horaInicio"
            type="time"
            required
          />
        </div>
        <button type="submit">
          Consultar lista
        </button>
      </form>

      <table v-if="listaEspera.length">
        <thead>
          <tr>
            <th>orden</th>
            <th>ID</th>
            <th>Paciente</th>
            <th>Agenda</th>
            <th>Horario</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(registro, index) in listaEspera"
            :key="registro.id"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ registro.id }}</td>
            <td>{{ registro.pacienteId }}</td>
            <td>{{ registro.agendaId }}</td>
            <td>
              {{ registro.horaInicio }}
              -
              {{ registro.horaFin }}
            </td>
            <td>{{ registro.estado }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay pacientes en la lista consultada.
      </p>
    </section>

    <section>
      <h2>Listado de turnos</h2>

      <p v-if="cargando">
        Cargando turnos...
      </p>

      <table v-else-if="turnos.length">
        <thead>
          <tr>
            <th>ID</th>
            <th>Agenda</th>
            <th>Paciente</th>
            <th>Horario</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Duración reducida</th>
            <th>Versión</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="turno in turnos"
            :key="turno.id"
          >
            <td>{{ turno.id }}</td>
            <td>{{ turno.agendaId }}</td>
            <td>{{ turno.pacienteId }}</td>

            <td>
              {{ turno.horaInicio }}
              -
              {{ turno.horaFin }}
            </td>

            <td>{{ turno.estado }}</td>
            <td>{{ turno.tipo }}</td>

            <td>
              {{
                turno.duracionReducida
                  ? 'Sí'
                  : 'No'
              }}
            </td>

            <td>{{ turno.version }}</td>

            <td>
              <button
                v-if="turno.estado === 'Programado'"
                type="button"
                @click="confirmar(turno)"
              >
                Confirmar
              </button>

              <button
                v-if="turno.estado === 'Confirmado'"
                type="button"
                @click="salaEspera(turno)"
              >
                Sala de espera
              </button>

              <button
                v-if="turno.estado === 'En Sala de Espera'"
                type="button"
                @click="atender(turno)"
              >
                Atender
              </button>

              <button
                v-if="
                  turno.estado !== 'Atendido' &&
                  turno.estado !== 'Cancelado'
                "
                type="button"
                @click="cancelar(turno)"
              >
                Cancelar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No hay turnos registrados.
      </p>
    </section>
  </main>
</template>
