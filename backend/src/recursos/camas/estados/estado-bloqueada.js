import { EstadoCama } from './estado-cama';

export class EstadoBloqueada extends EstadoCama {
  obtenerNombre() {
    return 'Bloqueada';
  }

  desbloquear() {
    return 'Libre';
  }
}