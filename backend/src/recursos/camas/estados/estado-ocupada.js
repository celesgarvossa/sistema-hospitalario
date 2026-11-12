import { EstadoCama } from './estado-cama';

export class EstadoOcupada extends EstadoCama {
  obtenerNombre() {
    return 'Ocupada';
  }

  darAlta() {
    return 'En limpieza';
  }
}