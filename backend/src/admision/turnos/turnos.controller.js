import { Controller, Dependencies, Get, Post, Patch, Bind, Body, Param } from '@nestjs/common';

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

  @Post('entreturno')
  @Bind(Body())
  crearEntreturno(datosTurno) {
    return this.turnosService.crearEntreturno(datosTurno);
  }

  @Patch(':id/confirmar')
  @Bind(Param('id'), Body())
  confirmar(id) {
    return this.turnosService.confirmar(id);
  }

  @Patch(':id/sala-espera')
  @Bind(Param('id'))
  ingresarSalaEspera(id) {
    return this.turnosService.ingresarSalaEspera(id);
  }

  @Patch(':id/atender')
  @Bind(Param('id'))
  atender(id) {
    return this.turnosService.atender(id);
  }

  @Patch(':id/cancelar')
  @Bind(Param('id'))
  cancelar(id) {
    return this.turnosService.cancelar(id);
  }

  @Post('lista-espera')
  @Bind(Body())
  agregarAListaEspera(datos) {
    return this.turnosService.agregarAListaEspera(datos);
  }

  @Get('lista-espera/:agendaId/:horaInicio')
  @Bind(Param('agendaId'), Param('horaInicio'))
  obtenerListaEspera(agendaId, horaInicio) {
    return this.turnosService.obtenerListaEspera(agendaId, horaInicio);
  }
}
