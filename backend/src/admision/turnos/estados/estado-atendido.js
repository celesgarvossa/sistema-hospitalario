import { EstadoTurno } from './estado-turno';

export class EstadoAtendido extends EstadoTurno {
  obtenerNombre() {
    return 'Atendido';
  }
}