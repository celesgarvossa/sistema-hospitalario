import {
  Controller,
  Dependencies,
  Get,
} from '@nestjs/common';

import { ProtocolosService } from './protocolos.service';

@Controller('protocolos')
@Dependencies(ProtocolosService)
export class ProtocolosController {
  constructor(protocolosService) {
    this.protocolosService = protocolosService;
  }

  @Get('preoperatorio')
  obtenerPreoperatorio() {
    return this.protocolosService.obtenerPreoperatorio();
  }

  @Get('respiratorio')
  obtenerRespiratorio() {
    return this.protocolosService.obtenerRespiratorio();
  }
}