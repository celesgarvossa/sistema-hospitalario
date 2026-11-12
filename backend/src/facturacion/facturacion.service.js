import {
  Injectable,
  Dependencies,
  BadRequestException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Cargo } from './cargo.entity';
import { EstrategiaFacturacionFactory } from './estrategias/estrategia-facturacion.factory';

@Injectable()
@Dependencies(getRepositoryToken(Cargo))
export class FacturacionService {
  constructor(cargosRepository) {
    this.cargosRepository = cargosRepository;
  }

  obtenerTodos() {
    return this.cargosRepository.find();
  }

  async crearCargo(datos) {
    if (
      !datos.pacienteId ||
      !datos.tipoCobertura ||
      !datos.concepto ||
      datos.montoBase === undefined
    ) {
      throw new BadRequestException(
        'pacienteId, tipoCobertura, concepto y montoBase son obligatorios',
      );
    }

    const montoBase = Number(datos.montoBase);

    if (montoBase < 0) {
      throw new BadRequestException(
        'El monto base no puede ser negativo',
      );
    }

    let estrategia;

    try {
      estrategia =
        EstrategiaFacturacionFactory.crear(
          datos.tipoCobertura.toUpperCase(),
        );
    } catch (error) {
      throw new BadRequestException(
        error.message,
      );
    }

    const montoFinal =
      estrategia.calcular(montoBase);

    const cargo = this.cargosRepository.create({
      pacienteId: Number(datos.pacienteId),
      tipoCobertura:
        estrategia.obtenerTipo(),
      concepto: datos.concepto,
      montoBase,
      montoFinal,
      referenciaTipo:
        datos.referenciaTipo ?? null,
      referenciaId:
        datos.referenciaId
          ? Number(datos.referenciaId)
          : null,
    });

    return await this.cargosRepository.save(cargo);
  }
}