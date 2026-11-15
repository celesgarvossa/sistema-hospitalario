import { EntitySchema } from 'typeorm';

export const AdministracionMedicacion = new EntitySchema({
  name: 'AdministracionMedicacion',
  tableName: 'administraciones_medicacion',

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

    medicamentoId: {
      name: 'medicamento_id',
      type: 'int',
    },

    enfermeroId: {
      name: 'enfermero_id',
      type: 'int',
    },

    cantidad: {
      type: 'int',
    },

    horarioProgramado: {
      name: 'horario_programado',
      type: 'datetime',
    },

    horarioAdministracion: {
      name: 'horario_administracion',
      type: 'datetime',
    },

    dentroVentana: {
      name: 'dentro_ventana',
      type: 'boolean',
      default: false,
    },

    registradoEn: {
      name: 'registrado_en',
      type: 'timestamp',
      createDate: true,
    },
  },
});