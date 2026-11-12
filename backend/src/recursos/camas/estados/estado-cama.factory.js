import { EstadoLibre } from './estado-libre';
import { EstadoOcupada } from './estado-ocupada';
import { EstadoEnLimpieza } from './estado-en-limpieza';
import { EstadoBloqueada } from './estado-bloqueada';

export class EstadoCamaFactory {
  static crear(estado) {
    switch (estado) {
      case 'Libre':
        return new EstadoLibre();

      case 'Ocupada':
        return new EstadoOcupada();

      case 'En limpieza':
        return new EstadoEnLimpieza();

      case 'Bloqueada':
        return new EstadoBloqueada();

      default:
        throw new Error(
          `Estado de cama desconocido: ${estado}`,
        );
    }
  }
}