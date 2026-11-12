import {
  Controller,
  Dependencies,
  Get,
  Post,
  Patch,
  Param,
  Bind,
  Body,
} from '@nestjs/common';

import { CamasService } from './camas.service';

@Controller('camas')
@Dependencies(CamasService)
export class CamasController {
  constructor(camasService) {
    this.camasService = camasService;
  }

  @Get()
  obtenerTodas() {
    return this.camasService.obtenerTodas();
  }

  @Post()
  @Bind(Body())
  crear(datos) {
    return this.camasService.crear(datos);
  }

  @Patch(':id/asignar')
  @Bind(Param('id'), Body())
    asignar(id, datos) {
    return this.camasService.asignar(
        id, 
        datos.pacienteId
    );
  }

  @Patch(':id/alta')
  @Bind(Param('id'))
  darAlta(id) {
    return this.camasService.darAlta(id);
  }

  @Patch(':id/finalizar-limpieza')
  @Bind(Param('id'))
  finalizarLimpieza(id) {
    return this.camasService.finalizarLimpieza(id);
  }
  
  @Patch(':id/bloquear')
  @Bind(Param('id'))
  bloquear(id) {
    return this.camasService.bloquear(id);
  }

  @Patch(':id/desbloquear')
  @Bind(Param('id'))
  desbloquear(id) {
    return this.camasService.desbloquear(id);
  }
}