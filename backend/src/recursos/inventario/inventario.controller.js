import {
  Controller,
  Dependencies,
  Get,
  Post,
  Bind,
  Body,
} from '@nestjs/common';

import { InventarioService } from './inventario.service';

@Controller('inventario')
@Dependencies(InventarioService)
export class InventarioController {
  constructor(inventarioService) {
    this.inventarioService = inventarioService;
  }

  @Get()
  obtenerTodos() {
    return this.inventarioService.obtenerTodos();
  }

  @Post()
  @Bind(Body())
  crear(datos) {
    return this.inventarioService.crear(datos);
  }
}