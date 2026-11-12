import { EstrategiaFacturacion } from './estrategia-facturacion';

export class PrepagaStrategy extends EstrategiaFacturacion {
  calcular(montoBase) {
    return Number(montoBase) * 0.20;
  }

  obtenerTipo() {
    return 'PREPAGA';
  }
}