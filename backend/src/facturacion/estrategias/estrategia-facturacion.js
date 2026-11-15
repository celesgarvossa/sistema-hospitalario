export class EstrategiaFacturacion {
  calcular(montoBase) {
    throw new Error(
      'La estrategia debe implementar calcular()',
    );
  }

  obtenerTipo() {
    throw new Error(
      'La estrategia debe implementar obtenerTipo()',
    );
  }
}