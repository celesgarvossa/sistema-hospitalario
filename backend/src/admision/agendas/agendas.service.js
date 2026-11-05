import { Injectable, Dependencies, BadRequestException, ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Agenda } from './agenda.entity';

@Injectable()
@Dependencies(getRepositoryToken(Agenda))
export class AgendasService {
  constructor(agendasRepository) {
    this.agendasRepository = agendasRepository;
  }

  obtenerTodas() {
    return this.agendasRepository.find();
  }

  async crear(datosAgenda) {
  if (!datosAgenda.medicoId || !datosAgenda.fecha) {
    throw new BadRequestException(
      'medicoId y fecha son obligatorios',
    );
  }

  const agenda = this.agendasRepository.create({
    medicoId: Number(datosAgenda.medicoId),
    fecha: datosAgenda.fecha,
    activa: datosAgenda.activa ?? true,
  });

  try {
    return await this.agendasRepository.save(agenda);
  }  catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ConflictException('Ya existe una agenda para ese médico en esa fecha');
    }
    throw error;
  }
}
}