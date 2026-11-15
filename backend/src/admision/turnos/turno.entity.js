import { EntitySchema } from 'typeorm';

export const Turno = new EntitySchema({
  name: 'Turno',
  tableName: 'turnos',

  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },

    agendaId: {
      name: 'agenda_id',
      type: 'int',
    },

    pacienteId: {
      name: 'paciente_id',
      type: 'int',
    },

    horaInicio: {
      name: 'hora_inicio',
      type: 'time',
    },

    horaFin: {
      name: 'hora_fin',
      type: 'time',
    },

    estado: {
      type: 'varchar',
      length: 30,
      default: 'Programado',
    },

    tipo: {
      type: 'varchar',
      length: 20,
      default: 'NORMAL',
    },

    duracionReducida: {
      name: 'duracion_reducida',
      type: 'boolean',
      default: false,
    },

    version: {
      type: 'int',
      default: 1,
    },
  },
});
