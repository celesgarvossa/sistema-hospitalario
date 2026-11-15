import { EntitySchema } from 'typeorm';

export const Cargo = new EntitySchema({
  name: 'Cargo',
  tableName: 'cargos',

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

    tipoCobertura: {
      name: 'tipo_cobertura',
      type: 'varchar',
      length: 20,
    },

    concepto: {
      type: 'varchar',
      length: 150,
    },

    montoBase: {
      name: 'monto_base',
      type: 'decimal',
      precision: 10,
      scale: 2,
    },

    montoFinal: {
      name: 'monto_final',
      type: 'decimal',
      precision: 10,
      scale: 2,
    },

    referenciaTipo: {
      name: 'referencia_tipo',
      type: 'varchar',
      length: 50,
      nullable: true,
    },

    referenciaId: {
      name: 'referencia_id',
      type: 'int',
      nullable: true,
    },

    creadoEn: {
      name: 'creado_en',
      type: 'timestamp',
      createDate: true,
    },
  },
});