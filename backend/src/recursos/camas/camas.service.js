import {
  Injectable,
  Dependencies,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Cama } from './cama.entity';
import { EstadoCamaFactory } from './estados/estado-cama.factory';

@Injectable()
@Dependencies(getRepositoryToken(Cama))
export class CamasService {
  constructor(camasRepository) {
    this.camasRepository = camasRepository;
  }

  obtenerTodas() {
    return this.camasRepository.find();
  }

  async crear(datos) {
    if (!datos.numero || !datos.sector) {
      throw new BadRequestException(
        'numero y sector son obligatorios',
      );
    }

    const cama = this.camasRepository.create({
      numero: datos.numero,
      sector: datos.sector,
      estado: 'Libre',
      pacienteId: null,
    });

    return await this.camasRepository.save(cama);
  }

  async asignar(id, pacienteId) {
    if (!pacienteId) {
      throw new BadRequestException(
        'pacienteId es obligatorio',
      );
    }

    return await this.camasRepository.manager.transaction(
      async (manager) => {
        const camasRepository =
          manager.getRepository(Cama);

        const cama = await camasRepository.findOne({
          where: {
            id: Number(id),
          },
          lock: {
            mode: 'pessimistic_write',
          },
        });

        if (!cama) {
          throw new NotFoundException(
            'Cama no encontrada',
          );
        }

        const estadoActual =
          EstadoCamaFactory.crear(cama.estado);

        try {
          cama.estado = estadoActual.ocupar();
        } catch (error) {
          throw new BadRequestException(
            error.message,
          );
        }

        cama.pacienteId = Number(pacienteId);

        return await camasRepository.save(cama);
      },
    );
  }
  
  async darAlta(id) {
  const cama = await this.camasRepository.findOneBy({
    id: Number(id),
  });

  if (!cama) {
    throw new NotFoundException(
      'Cama no encontrada',
    );
  }

  const estadoActual =
    EstadoCamaFactory.crear(cama.estado);

  try {
    cama.estado = estadoActual.darAlta();
  } catch (error) {
    throw new BadRequestException(
      error.message,
    );
  }

  cama.pacienteId = null;

  return await this.camasRepository.save(cama);
}

async finalizarLimpieza(id) {
  const cama = await this.camasRepository.findOneBy({
    id: Number(id),
  });

  if (!cama) {
    throw new NotFoundException(
      'Cama no encontrada',
    );
  }

  const estadoActual =
    EstadoCamaFactory.crear(cama.estado);

  try {
    cama.estado =
      estadoActual.finalizarLimpieza();
  } catch (error) {
    throw new BadRequestException(
      error.message,
    );
  }

  return await this.camasRepository.save(cama);
}
}