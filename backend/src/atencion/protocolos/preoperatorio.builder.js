import { ProtocoloBuilder } from './protocolo.builder';

export class PreoperatorioBuilder extends ProtocoloBuilder {
  constructor() {
    super();

    this
      .establecerNombre('Protocolo Preoperatorio')
      .agregarPaso('Verificar ayuno de 8 horas')
      .agregarPaso('Colocar vía intravenosa periférica')
      .agregarPaso(
        'Realizar control de signos vitales cada 2 horas',
      );
  }
}