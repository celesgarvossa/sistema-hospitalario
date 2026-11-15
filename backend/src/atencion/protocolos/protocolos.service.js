import { Injectable } from '@nestjs/common';

import { PreoperatorioBuilder } from './preoperatorio.builder';
import { RespiratorioBuilder } from './respiratorio.builder';

@Injectable()
export class ProtocolosService {
  obtenerPreoperatorio() {
    const builder = new PreoperatorioBuilder();

    return builder.construir();
  }

  obtenerRespiratorio() {
    const builder = new RespiratorioBuilder();

    return builder.construir();
  }
}