import { Module } from '@nestjs/common';

import { SignosVitalesModule } from './signos-vitales/signos-vitales.module';
import { MedicacionModule } from './medicacion/medicacion.module';

@Module({
  imports: [
    SignosVitalesModule,
    MedicacionModule,
  ],
})
export class AtencionModule {}