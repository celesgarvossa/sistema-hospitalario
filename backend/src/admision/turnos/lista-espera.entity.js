import { EntitySchema } from 'typeorm';

export const ListaEspera = new EntitySchema({
  name: 'ListaEspera',
  tableName: 'lista_espera',

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
      length: 20,
      default: 'ESPERANDO',
    },

    creadoEn: {
      name: 'creado_en',
      type: 'timestamp',
      createDate: true,
    },
  },

  indices: [
    {
      name: 'UQ_lista_espera_paciente_horario',
      columns: ['agendaId', 'horaInicio', 'pacienteId'],
      unique: true,
    },
  ],
});