import { Module } from '@nestjs/common';

import { SignosVitalesModule } from './signos-vitales/signos-vitales.module';
import { MedicacionModule } from './medicacion/medicacion.module';
import { ProtocolosModule } from './protocolos/protocolos.module';

@Module({
  imports: [
    SignosVitalesModule,
    MedicacionModule,
    ProtocolosModule,
  ],
})
export class AtencionModule {}