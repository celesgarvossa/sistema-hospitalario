import { EstadoProgramado } from './estado-programado';
import { EstadoConfirmado } from './estado-confirmado';
import { EstadoSalaEspera } from './estado-sala-espera';
import { EstadoAtendido } from './estado-atendido';
import { EstadoCancelado } from './estado-cancelado';

export class EstadoTurnoFactory {
  static crear(estado) {
    switch (estado) {
      case 'Programado':
        return new EstadoProgramado();

      case 'Confirmado':
        return new EstadoConfirmado();

      case 'En Sala de Espera':
        return new EstadoSalaEspera();

      case 'Atendido':
        return new EstadoAtendido();

      case 'Cancelado':
        return new EstadoCancelado();

      default:
        throw new Error(`Estado de turno desconocido: ${estado}`);
    }
  }
}