import {
  Injectable,
  Dependencies,
} from '@nestjs/common';

import { OnEvent } from '@nestjs/event-emitter';

import { FacturacionService } from './facturacion.service';

@Injectable()
@Dependencies(FacturacionService)
export class MedicacionAdministradaListener {
  constructor(facturacionService) {
    this.facturacionService =
      facturacionService;
  }

  @OnEvent('medicacion.administrada')
  async manejar(evento) {
    return await this.facturacionService.crearCargo({
      pacienteId: evento.pacienteId,
      tipoCobertura: evento.tipoCobertura,
      concepto: 'Administración de medicación',
      montoBase: evento.montoBase,
      referenciaTipo: 'MEDICACION',
      referenciaId: evento.administracionId,
    });
  }
}