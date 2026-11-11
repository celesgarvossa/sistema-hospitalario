import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Triage } from './triage.entity';
import { TriageService } from './triage.service';
import { TriageController } from './triage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Triage])],
  controllers: [TriageController],
  providers: [TriageService],
})
export class TriageModule {}