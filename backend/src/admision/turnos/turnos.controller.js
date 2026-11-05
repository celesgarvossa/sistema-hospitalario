import { Controller, Dependencies, Get, Post, Bind, Body } from '@nestjs/common';

import { TurnosService } from './turnos.service';

@Controller('turnos')
@Dependencies(TurnosService)
export class TurnosController {
  constructor(turnosService) {
    this.turnosService = turnosService;
  }

  @Get()
  obtenerTodos() {
    return this.turnosService.obtenerTodos();
  }

  @Post()
  @Bind(Body())
  crear(datosTurno) {
    return this.turnosService.crear(datosTurno);
  }
}