import { EstadoTurno } from './estado-turno';

export class EstadoConfirmado extends EstadoTurno {
  ingresarSalaEspera() {
    return 'En Sala de Espera';
  }

  cancelar() {
    return 'Cancelado';
  }

  obtenerNombre() {
    return 'Confirmado';
  }
}