import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AgendasController } from './agendas.controller';
import { AgendasService } from './agendas.service';
import { Agenda } from './agenda.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agenda]),
  ],
  controllers: [AgendasController],
  providers: [AgendasService],
})
export class AgendasModule {}