import {
  Injectable,
  Dependencies,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AdministracionMedicacion } from './administracion-medicacion.entity';
import { Medicamento } from '../../recursos/inventario/medicamento.entity';
import { MedicacionAdministradaEvent } from './eventos/medicacion-administrada.event';

@Injectable()
@Dependencies(
  getRepositoryToken(AdministracionMedicacion),
  EventEmitter2,
)
export class MedicacionService {
  constructor(administracionRepository, eventEmitter) {
    this.administracionRepository =
      administracionRepository;

    this.eventEmitter = eventEmitter;
  }

  obtenerTodas() {
    return this.administracionRepository.find();
  }

  async crear(datos) {
    if (
      !datos.pacienteId ||
      !datos.medicamentoId ||
      !datos.enfermeroId ||
      !datos.cantidad ||
      !datos.horarioProgramado ||
      !datos.horarioAdministracion ||
      !datos.tipoCobertura ||
      datos.montoBase === undefined
    ) {
      throw new BadRequestException(
        'pacienteId, medicamentoId, enfermeroId, cantidad, horarioProgramado, horarioAdministracion, tipoCobertura y montoBase son obligatorios',
      );
    }

    const cantidad = Number(datos.cantidad);

    if (cantidad <= 0) {
      throw new BadRequestException(
        'La cantidad debe ser mayor a cero',
      );
    }

    const programado = new Date(
      datos.horarioProgramado,
    );

    const administrado = new Date(
      datos.horarioAdministracion,
    );

    if (
      Number.isNaN(programado.getTime()) ||
      Number.isNaN(administrado.getTime())
    ) {
      throw new BadRequestException(
        'Los horarios ingresados no son válidos',
      );
    }

    const diferenciaMs = Math.abs(
      administrado.getTime() -
        programado.getTime(),
    );

    const diferenciaMinutos =
      diferenciaMs / (1000 * 60);

    const dentroVentana =
      diferenciaMinutos <= 30;

    const registroGuardado =
      await this.administracionRepository.manager.transaction(
        async (manager) => {
          const medicamentosRepository =
            manager.getRepository(Medicamento);

          const administracionesRepository =
            manager.getRepository(
              AdministracionMedicacion,
            );

          const medicamento =
            await medicamentosRepository.findOne({
              where: {
                id: Number(
                  datos.medicamentoId,
                ),
              },
              lock: {
                mode: 'pessimistic_write',
              },
            });

          if (!medicamento) {
            throw new NotFoundException(
              'Medicamento no encontrado',
            );
          }

          if (!medicamento.activo) {
            throw new BadRequestException(
              'El medicamento no está activo',
            );
          }

          if (medicamento.stock < cantidad) {
            throw new BadRequestException(
              'Stock insuficiente',
            );
          }

          medicamento.stock =
            medicamento.stock - cantidad;

          await medicamentosRepository.save(
            medicamento,
          );

          const registro =
            administracionesRepository.create({
              pacienteId: Number(
                datos.pacienteId,
              ),
              medicamentoId: Number(
                datos.medicamentoId,
              ),
              enfermeroId: Number(
                datos.enfermeroId,
              ),
              cantidad,
              horarioProgramado:
                programado,
              horarioAdministracion:
                administrado,
              dentroVentana,
            });

          return await administracionesRepository.save(
            registro,
          );
        },
      );

    this.eventEmitter.emit(
      'medicacion.administrada',
      new MedicacionAdministradaEvent({
        administracionId:
          registroGuardado.id,
        pacienteId:
          registroGuardado.pacienteId,
        tipoCobertura:
          datos.tipoCobertura,
        montoBase:
          Number(datos.montoBase),
      }),
    );

    return registroGuardado;
  }
}