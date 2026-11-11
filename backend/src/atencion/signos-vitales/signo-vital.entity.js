import { EntitySchema } from 'typeorm';

export const SignoVital = new EntitySchema({
  name: 'SignoVital',
  tableName: 'signos_vitales',

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

    temperatura: {
      type: 'decimal',
      precision: 4,
      scale: 1,
      nullable: true,
    },

    presionSistolica: {
      name: 'presion_sistolica',
      type: 'int',
      nullable: true,
    },

    presionDiastolica: {
      name: 'presion_diastolica',
      type: 'int',
      nullable: true,
    },

    frecuenciaCardiaca: {
      name: 'frecuencia_cardiaca',
      type: 'int',
      nullable: true,
    },

    saturacionOxigeno: {
      name: 'saturacion_oxigeno',
      type: 'int',
      nullable: true,
    },

    alertaTemperatura: {
      name: 'alerta_temperatura',
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