import {
  Injectable,
  Dependencies,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Turno } from './turno.entity';

@Injectable()
@Dependencies(getRepositoryToken(Turno))
export class TurnosService {
  constructor(turnosRepository) {
    this.turnosRepository = turnosRepository;
  }

  obtenerTodos() {
    return this.turnosRepository.find();
  }

  async crear(datosTurno) {
    if (
      !datosTurno.agendaId ||
      !datosTurno.pacienteId ||
      !datosTurno.horaInicio ||
      !datosTurno.horaFin
    ) {
      throw new BadRequestException(
        'agendaId, pacienteId, horaInicio y horaFin son obligatorios',
      );
    }

    const turno = this.turnosRepository.create({
      agendaId: Number(datosTurno.agendaId),
      pacienteId: Number(datosTurno.pacienteId),
      horaInicio: datosTurno.horaInicio,
      horaFin: datosTurno.horaFin,
      estado: datosTurno.estado ?? 'Programado',
      tipo: datosTurno.tipo ?? 'NORMAL',
      duracionReducida: datosTurno.duracionReducida ?? false,
      version: 1,
    });

    try {
      return await this.turnosRepository.save(turno);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Ese horario ya está reservado en esta agenda',
        );
      }

      throw error;
    }
  }
}