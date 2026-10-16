import { Controller, Dependencies, Get } from '@nestjs/common';
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
}