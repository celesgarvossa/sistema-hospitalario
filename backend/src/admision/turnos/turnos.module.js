import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {Turno} from './turno.entity';
import {TurnosService} from './turnos.service';
import {TurnosController} from './turnos.controller';
import {ListaEspera} from './lista-espera.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Turno, ListaEspera])],
  providers: [TurnosService],
  controllers: [TurnosController],
})
export class TurnosModule {}
