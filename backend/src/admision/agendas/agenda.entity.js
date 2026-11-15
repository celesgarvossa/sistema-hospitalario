import { EntitySchema } from 'typeorm';

export const Agenda = new EntitySchema({
  name: 'Agenda',
  tableName: 'agendas',

  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },

    medicoId: {
      name: 'medico_id',
      type: 'int',
    },

    fecha: {
      type: 'date',
    },

    activa: {
      type: 'boolean',
      default: true,
    },
  },

  indices: [
    {
      name: 'IDX_agenda_medico_fecha',
      columns: ['medicoId', 'fecha'],
      unique: true,
    },
  ],
});