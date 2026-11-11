import { Module } from '@nestjs/common';
import { AgendasModule } from './agendas/agendas.module';
import { TurnosModule } from './turnos/turnos.module';
import { TriageModule } from './triage/triage.module';

@Module({
  imports: [AgendasModule, TurnosModule, TriageModule],
})
export class AdmisionModule {}
