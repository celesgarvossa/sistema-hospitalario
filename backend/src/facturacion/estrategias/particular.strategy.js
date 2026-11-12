import { EstrategiaFacturacion } from './estrategia-facturacion';

export class ParticularStrategy extends EstrategiaFacturacion {
  calcular(montoBase) {
    return Number(montoBase);
  }

  obtenerTipo() {
    return 'PARTICULAR';
  }
}