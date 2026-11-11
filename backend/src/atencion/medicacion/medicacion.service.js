import {
  Injectable,
  Dependencies,
  BadRequestException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { AdministracionMedicacion } from './administracion-medicacion.entity';

@Injectable()
@Dependencies(getRepositoryToken(AdministracionMedicacion))
export class MedicacionService {
  constructor(administracionRepository) {
    this.administracionRepository = administracionRepository;
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
      !datos.horarioAdministracion
    ) {
      throw new BadRequestException(
        'pacienteId, medicamentoId, enfermeroId, cantidad, horarioProgramado y horarioAdministracion son obligatorios',
      );
    }

    const programado = new Date(datos.horarioProgramado);
    const administrado = new Date(datos.horarioAdministracion);

    const diferenciaMs = Math.abs(
      administrado.getTime() - programado.getTime(),
    );

    const diferenciaMinutos =
      diferenciaMs / (1000 * 60);

    const dentroVentana = diferenciaMinutos <= 30;

    const registro = this.administracionRepository.create({
      pacienteId: Number(datos.pacienteId),
      medicamentoId: Number(datos.medicamentoId),
      enfermeroId: Number(datos.enfermeroId),
      cantidad: Number(datos.cantidad),
      horarioProgramado: programado,
      horarioAdministracion: administrado,
      dentroVentana,
    });

    return await this.administracionRepository.save(registro);
  }
}