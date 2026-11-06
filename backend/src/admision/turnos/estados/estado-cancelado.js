import { EstadoTurno } from './estado-turno';

export class EstadoCancelado extends EstadoTurno {
  obtenerNombre() {
    return 'Cancelado';
  }
}