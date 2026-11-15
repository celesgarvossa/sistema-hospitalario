import { EstadoCama } from './estado-cama';

export class EstadoLibre extends EstadoCama {
  obtenerNombre() {
    return 'Libre';
  }

  ocupar() {
    return 'Ocupada';
  }

  bloquear() {
    return 'Bloqueada';
  }
}