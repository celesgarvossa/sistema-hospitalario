import {
  Controller,
  Dependencies,
  Get,
  Post,
  Bind,
  Body,
} from '@nestjs/common';

import { MedicacionService } from './medicacion.service';

@Controller('medicacion')
@Dependencies(MedicacionService)
export class MedicacionController {
  constructor(medicacionService) {
    this.medicacionService = medicacionService;
  }

  @Get()
  obtenerTodas() {
    return this.medicacionService.obtenerTodas();
  }

  @Post()
  @Bind(Body())
  crear(datos) {
    return this.medicacionService.crear(datos);
  }
}