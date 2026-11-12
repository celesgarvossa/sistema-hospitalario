import { EntitySchema } from 'typeorm';

export const Medicamento = new EntitySchema({
  name: 'Medicamento',
  tableName: 'medicamentos',

  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },

    nombre: {
      type: 'varchar',
      length: 100,
    },

    descripcion: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },

    stock: {
      type: 'int',
      default: 0,
    },

    activo: {
      type: 'boolean',
      default: true,
    },
  },
});