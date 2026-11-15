import {
  Controller,
  Dependencies,
  Get,
  Post,
  Bind,
  Body,
} from '@nestjs/common';

import { SignosVitalesService } from './signos-vitales.service';

@Controller('signos-vitales')
@Dependencies(SignosVitalesService)
export class SignosVitalesController {
  constructor(signosVitalesService) {
    this.signosVitalesService = signosVitalesService;
  }

  @Get()
  obtenerTodos() {
    return this.signosVitalesService.obtenerTodos();
  }

  @Post()
  @Bind(Body())
  crear(datos) {
    return this.signosVitalesService.crear(datos);
  }
}