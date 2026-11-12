import {
  Controller,
  Dependencies,
  Get,
  Post,
  Bind,
  Body,
} from '@nestjs/common';

import { FacturacionService } from './facturacion.service';

@Controller('facturacion')
@Dependencies(FacturacionService)
export class FacturacionController {
  constructor(facturacionService) {
    this.facturacionService = facturacionService;
  }

  @Get()
  obtenerTodos() {
    return this.facturacionService.obtenerTodos();
  }

  @Post()
  @Bind(Body())
  crearCargo(datos) {
    return this.facturacionService.crearCargo(datos);
  }
}