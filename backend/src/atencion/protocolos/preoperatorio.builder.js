import { ProtocoloBuilder } from './protocolo.builder';

export class PreoperatorioBuilder extends ProtocoloBuilder {
  constructor() {
    super();

    this
      .establecerNombre('Protocolo Preoperatorio')
      .agregarPaso('Verificar ayuno')
      .agregarPaso('Controlar signos vitales')
      .agregarPaso('Preparar al paciente')
      .agregarPaso('Verificar documentación');
  }
}