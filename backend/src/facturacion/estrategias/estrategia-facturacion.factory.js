import { PublicoStrategy } from './publico.strategy';
import { PrepagaStrategy } from './prepaga.strategy';
import { ParticularStrategy } from './particular.strategy';

export class EstrategiaFacturacionFactory {
  static crear(tipo) {
    switch (tipo) {
      case 'PUBLICO':
        return new PublicoStrategy();

      case 'PREPAGA':
        return new PrepagaStrategy();

      case 'PARTICULAR':
        return new ParticularStrategy();

      default:
        throw new Error(
          `Tipo de facturación desconocido: ${tipo}`,
        );
    }
  }
}