import { EstrategiaFacturacion } from './estrategia-facturacion';

export class PublicoStrategy extends EstrategiaFacturacion {
  calcular(montoBase) {
    return 0;
  }

  obtenerTipo() {
    return 'PUBLICO';
  }
}