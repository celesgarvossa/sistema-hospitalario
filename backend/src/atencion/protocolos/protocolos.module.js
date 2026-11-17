import { Module } from '@nestjs/common';

import { ProtocolosService } from './protocolos.service';
import { ProtocolosController } from './protocolos.controller';
import { PacienteIngresadoListener } from './paciente-ingresado.listener';

@Module({
  controllers: [
    ProtocolosController,
  ],
  providers: [
    ProtocolosService,
    PacienteIngresadoListener,
  ],
})
export class ProtocolosModule {}