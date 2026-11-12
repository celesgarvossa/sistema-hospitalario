import { EntitySchema } from 'typeorm';

export const Cama = new EntitySchema({
  name: 'Cama',
  tableName: 'camas',

  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },

    numero: {
      type: 'varchar',
      length: 20,
      unique: true,
    },

    sector: {
      type: 'varchar',
      length: 100,
    },

    estado: {
      type: 'varchar',
      length: 30,
      default: 'Libre',
    },

    pacienteId: {
      name: 'paciente_id',
      type: 'int',
      nullable: true,
    },
  },
});