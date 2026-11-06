import {
  Injectable,
  Dependencies,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Turno } from './turno.entity';
import { EstadoTurnoFactory } from './estados/estado-turno.factory';
import {LessThan, MoreThan} from 'typeorm';

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

  async buscarTurnoAnterior(agendaId, horaInicio, repository = this.turnosRepository) {
  return await repository.findOne({
    where: {
      agendaId: Number(agendaId),
      horaInicio: LessThan(horaInicio),
      horaFin: MoreThan(horaInicio),
    },
    order: {
      horaInicio: 'DESC',
    },
  });
  }

  async crearEntreturno(datosTurno) {
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

  try {
    return await this.turnosRepository.manager.transaction(
      async (manager) => {
        const repository = manager.getRepository(Turno);

        const turnoAnterior = await this.buscarTurnoAnterior(
          datosTurno.agendaId,
          datosTurno.horaInicio,
          repository,
        );

        if (!turnoAnterior) {
          throw new BadRequestException(
            'No existe un turno anterior que pueda reducirse para crear el entreturno',
          );
        }

        turnoAnterior.horaFin = datosTurno.horaInicio;
        turnoAnterior.duracionReducida = true;

        await repository.save(turnoAnterior);

        const entreturno = repository.create({
          agendaId: Number(datosTurno.agendaId),
          pacienteId: Number(datosTurno.pacienteId),
          horaInicio: datosTurno.horaInicio,
          horaFin: datosTurno.horaFin,
          estado: 'Programado',
          tipo: 'ENTRETURNO',
          duracionReducida: false,
          version: 1,
        });

        return await repository.save(entreturno);
      },
    );
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ConflictException(
        'Ese horario ya está reservado en esta agenda',
      );
    }

    throw error;
  }
}

  async confirmar(id) {
    const turno = await this.turnosRepository.findOneBy({
    id: Number(id),
    });

    if (!turno) {
      throw new NotFoundException('Turno no encontrado');
    }

    const estadoActual = EstadoTurnoFactory.crear(turno.estado);

    try {
      turno.estado = estadoActual.confirmar();
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return await this.turnosRepository.save(turno);
  }

    async ingresarSalaEspera(id) {
    const turno = await this.turnosRepository.findOneBy({
      id: Number(id),
    });

    if (!turno) {
      throw new NotFoundException('Turno no encontrado');
    }

    const estadoActual = EstadoTurnoFactory.crear(turno.estado);

    try {
      turno.estado = estadoActual.ingresarSalaEspera();
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return await this.turnosRepository.save(turno);
  }
  async atender(id) {
    const turno = await this.turnosRepository.findOneBy({
      id: Number(id),
    });

    if (!turno) {
      throw new NotFoundException('Turno no encontrado');
    }

    const estadoActual = EstadoTurnoFactory.crear(turno.estado);

    try {
      turno.estado = estadoActual.atender();
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return await this.turnosRepository.save(turno);
    }

    async cancelar(id) {
  const turno = await this.turnosRepository.findOneBy({
    id: Number(id),
  });

  if (!turno) {
    throw new NotFoundException('Turno no encontrado');
  }

  const estadoActual = EstadoTurnoFactory.crear(turno.estado);

  try {
    turno.estado = estadoActual.cancelar();
  } catch (error) {
    throw new BadRequestException(error.message);
  }

  return await this.turnosRepository.save(turno);
  } 
}
