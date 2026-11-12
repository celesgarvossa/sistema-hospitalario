import { ProtocoloBuilder } from './protocolo.builder';

export class RespiratorioBuilder extends ProtocoloBuilder {
  constructor() {
    super();

    this
      .establecerNombre('Protocolo Respiratorio')
      .agregarPaso('Controlar saturación de oxígeno')
      .agregarPaso('Evaluar necesidad de oxigenoterapia')
      .agregarPaso('Realizar nebulización si corresponde')
      .agregarPaso('Controlar evolución del paciente');
  }
}