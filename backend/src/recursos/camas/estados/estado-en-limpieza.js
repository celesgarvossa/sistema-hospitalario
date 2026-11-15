import { EstadoCama } from './estado-cama';

export class EstadoEnLimpieza extends EstadoCama {
  obtenerNombre() {
    return 'En limpieza';
  }

  finalizarLimpieza() {
    return 'Libre';
  }
}