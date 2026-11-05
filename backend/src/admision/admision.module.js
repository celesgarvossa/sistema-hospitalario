import { Module } from '@nestjs/common';
import { AgendasModule } from './agendas/agendas.module';
import { TurnosModule } from './turnos/turnos.module';

@Module({
  imports: [AgendasModule, TurnosModule]
})
export class AdmisionModule {}
