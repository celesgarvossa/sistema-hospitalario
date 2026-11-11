import { Controller, Dependencies, Get, Post, Bind, Body } from '@nestjs/common';

import { TriageService } from './triage.service';

@Controller('triage')
@Dependencies(TriageService)
export class TriageController {
  constructor(triageService) {
    this.triageService = triageService;
  }

  @Get()
  obtenerCola() {
    return this.triageService.obtenerCola();
  }

  @Post()
  
  @Bind(Body())
    crear(datosTriage) {
        return this.triageService.crear(datosTriage);
    }
}