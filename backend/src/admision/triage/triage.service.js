import { Injectable, Dependencies, BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Triage } from './triage.entity';

@Injectable()
@Dependencies(getRepositoryToken(Triage))
export class TriageService {
  constructor(triageRepository) {
    this.triageRepository = triageRepository;
  }

  obtenerCola() {
    return this.triageRepository.find({
      where: {
        estado: 'ESPERANDO',
      },
      order: {
        prioridad: 'ASC',
        creadoEn: 'ASC',
        id: 'ASC',
      },
    });
  }

  async crear(datosTriage) {
  if (!datosTriage.pacienteId || !datosTriage.codigo) {
    throw new BadRequestException(
      'pacienteId y codigo son obligatorios',
    );
  }

  const codigo = datosTriage.codigo.toUpperCase();

  const prioridades = {
    ROJO: 1,
    AMARILLO: 2,
    VERDE: 3,
  };

  const prioridad = prioridades[codigo];

  if (!prioridad) {
    throw new BadRequestException(
      'El codigo debe ser ROJO, AMARILLO o VERDE',
    );
  }

  const registro = this.triageRepository.create({
    pacienteId: Number(datosTriage.pacienteId),
    codigo,
    prioridad,
    estado: 'ESPERANDO',
  });

  return await this.triageRepository.save(registro);
}
}