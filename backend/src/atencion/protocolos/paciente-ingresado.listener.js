import {
  Injectable,
  Dependencies,
} from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { ProtocolosService } from './protocolos.service';

@Injectable()
@Dependencies(ProtocolosService)
export class PacienteIngresadoListener {
  constructor(protocolosService) {
    this.protocolosService = protocolosService;
  }

  @OnEvent('paciente.ingresado')
  manejar(evento) {
    if (evento.tipoIngreso === 'PREQUIRURGICO') {
      const protocolo =
        this.protocolosService.obtenerPreoperatorio();

      console.log(
        'Protocolo generado automáticamente:',
        protocolo,
      );

      return protocolo;
    }

    if (evento.tipoIngreso === 'RESPIRATORIO') {
      const protocolo =
        this.protocolosService.obtenerRespiratorio();

      console.log(
        'Protocolo generado automáticamente:',
        protocolo,
      );

      return protocolo;
    }

    console.log(
      'Tipo de ingreso sin protocolo asociado:',
      evento.tipoIngreso,
    );

    return null;
  }
}