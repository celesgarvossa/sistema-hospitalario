import {
  Injectable,
  Dependencies,
  BadRequestException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { SignoVital } from './signo-vital.entity';

@Injectable()
@Dependencies(getRepositoryToken(SignoVital))
export class SignosVitalesService {
  constructor(signosVitalesRepository) {
    this.signosVitalesRepository = signosVitalesRepository;
  }

  obtenerTodos() {
    return this.signosVitalesRepository.find();
  }

  async crear(datos) {
    if (!datos.pacienteId) {
      throw new BadRequestException(
        'pacienteId es obligatorio',
      );
    }

    const temperatura =
      datos.temperatura !== undefined
        ? Number(datos.temperatura)
        : null;

    const registro = this.signosVitalesRepository.create({
      pacienteId: Number(datos.pacienteId),
      temperatura,
      presionSistolica: datos.presionSistolica ?? null,
      presionDiastolica: datos.presionDiastolica ?? null,
      frecuenciaCardiaca: datos.frecuenciaCardiaca ?? null,
      saturacionOxigeno: datos.saturacionOxigeno ?? null,
      alertaTemperatura:
        temperatura !== null && temperatura > 39,
    });

    return await this.signosVitalesRepository.save(registro);
  }
}