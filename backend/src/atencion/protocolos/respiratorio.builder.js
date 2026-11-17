import { ProtocoloBuilder } from './protocolo.builder';

export class RespiratorioBuilder extends ProtocoloBuilder {
  constructor() {
    super();

    this
      .establecerNombre('Protocolo Respiratorio')
      .agregarPaso(
        'Monitoreo de saturación de oxígeno continuo',
      )
      .agregarPaso(
        'Indicación de aislamiento de contacto y gotas',
      );
  }
}