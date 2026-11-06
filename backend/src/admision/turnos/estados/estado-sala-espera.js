import { EstadoTurno } from './estado-turno';

export class EstadoSalaEspera extends EstadoTurno {
  atender() {
    return 'Atendido';
  }

  cancelar() {
    return 'Cancelado';
  }

  obtenerNombre() {
    return 'En Sala de Espera';
  }
}