import { EntitySchema } from 'typeorm';

export const Triage = new EntitySchema({
  name: 'Triage',
  tableName: 'triage',

  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },

    pacienteId: {
      name: 'paciente_id',
      type: 'int',
    },

    codigo: {
      type: 'varchar',
      length: 20,
    },

    prioridad: {
      type: 'int',
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
});