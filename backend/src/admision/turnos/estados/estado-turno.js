export class EstadoTurno {
  confirmar() {
    throw new Error('Transición de estado no permitida');
  }

  ingresarSalaEspera() {
    throw new Error('Transición de estado no permitida');
  }

  atender() {
    throw new Error('Transición de estado no permitida');
  }

  cancelar() {
    throw new Error('Transición de estado no permitida');
  }

  obtenerNombre() {
    throw new Error('El estado debe implementar obtenerNombre()');
  }
}