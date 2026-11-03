import { Controller, Dependencies, Get, Post, Patch, Delete, Bind, Body, Param, } from '@nestjs/common';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
@Dependencies(PacientesService)
export class PacientesController {
  constructor(pacientesService) {
    this.pacientesService = pacientesService;
  }

  @Get()
  obtenerTodos() {
    return this.pacientesService.obtenerTodos();
  }

  @Get(':id')
  @Bind(Param('id'))
  obtenerPorId(id) {
    return this.pacientesService.obtenerPorId(id);
  }

  @Patch(':id')
  @Bind(Param('id'), Body())
  actualizar(id, datosPaciente) {
    return this.pacientesService.actualizar(id, datosPaciente);
  }
  
  @Post()
  @Bind(Body())
  crear(datosPaciente) {
    return this.pacientesService.crear(datosPaciente);
  }

  @Delete(':id')
  @Bind(Param('id'))
  eliminar(id) {
    return this.pacientesService.eliminar(id);
  }

}