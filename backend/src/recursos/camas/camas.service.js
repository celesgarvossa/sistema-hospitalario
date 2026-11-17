import {
  Injectable,
  Dependencies,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Cama } from './cama.entity';
import { EstadoCamaFactory } from './estados/estado-cama.factory';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { PacienteIngresadoEvent } from './eventos/paciente-ingresado.event';

@Injectable()
@Dependencies(getRepositoryToken(Cama), EventEmitter2)
export class CamasService {
  constructor(camasRepository, eventEmitter) {
    this.camasRepository = camasRepository;
    this.eventEmitter = eventEmitter
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

  async asignar(id, pacienteId, tipoIngreso) {
    if (!pacienteId) {
      throw new BadRequestException(
        'pacienteId es obligatorio',
      );
    }
    if (!tipoIngreso){
      throw new BadRequestException(
        'tipoIngreso es obligatorio',
      );
    }
    if(
      tipoIngreso !== 'PREQUIRURGICO' &&
      tipoIngreso !== 'RESPIRATORIO'
    ){
      throw new BadRequestException(
        'tipoIngreso debe ser PREQUIRURGICO o RESPIRATORIO',
      );
    }

    const camaGuardada=
     await this.camasRepository.manager.transaction(
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
    
    const resultados =
      await this.eventEmitter.emitAsync(
        'paciente.ingresado',
        new PacienteIngresadoEvent({
          camaId: camaGuardada.id,
          pacienteId: camaGuardada.pacienteId,
          tipoIngreso,
        }),
      );
      const protocolo = resultados[0] || null;
    return {
      cama : camaGuardada,
      protocolo,
    };
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

async bloquear(id) {
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
    cama.estado = estadoActual.bloquear();
  } catch (error) {
    throw new BadRequestException(
      error.message,
    );
  }

  cama.pacienteId = null;

  return await this.camasRepository.save(cama);
}

async desbloquear(id) {
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
    cama.estado = estadoActual.desbloquear();
  } catch (error) {
    throw new BadRequestException(
      error.message,
    );
  }

  return await this.camasRepository.save(cama);
}
}