import {
  Controller,
  Dependencies,
  Get,
  Post,
  Bind,
  Body,
} from '@nestjs/common';

import { AgendasService } from './agendas.service';

@Controller('agendas')
@Dependencies(AgendasService)
export class AgendasController {
  constructor(agendasService) {
    this.agendasService = agendasService;
  }

  @Get()
  obtenerTodas() {
    return this.agendasService.obtenerTodas();
  }

  @Post()
  @Bind(Body())
  crear(datosAgenda) {
    return this.agendasService.crear(datosAgenda);
  }
}