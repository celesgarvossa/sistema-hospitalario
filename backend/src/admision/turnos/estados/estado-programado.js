import { EstadoTurno } from './estado-turno';

export class EstadoProgramado extends EstadoTurno {
  confirmar() {
    return 'Confirmado';
  }

  cancelar() {
    return 'Cancelado';
  }

  obtenerNombre() {
    return 'Programado';
  }
}