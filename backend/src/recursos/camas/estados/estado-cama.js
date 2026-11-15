export class EstadoCama {
  obtenerNombre() {
    throw new Error(
      'El estado debe implementar obtenerNombre()',
    );
  }

  ocupar() {
    throw new Error(
      'Transición de estado no permitida',
    );
  }

  darAlta() {
    throw new Error(
      'Transición de estado no permitida',
    );
  }

  finalizarLimpieza() {
    throw new Error(
      'Transición de estado no permitida',
    );
  }

  bloquear() {
    throw new Error(
      'Transición de estado no permitida',
    );
  }

  desbloquear() {
    throw new Error(
      'Transición de estado no permitida',
    );
  }
}