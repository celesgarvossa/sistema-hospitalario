import { Injectable, Dependencies, BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Paciente } from './paciente.entity';


@Injectable()
@Dependencies(getRepositoryToken(Paciente))
export class PacientesService {
  constructor(pacientesRepository) {
    this.pacientesRepository = pacientesRepository;
  }

obtenerTodos() {
    return this.pacientesRepository.find();
  }

async crear(datosPaciente) {
    if (!datosPaciente.nombre || !datosPaciente.apellido || !datosPaciente.documento) {
      throw new BadRequestException('Nombre, apellido y documento son obligatorios');
    }
    const paciente = this.pacientesRepository.create(datosPaciente);
    return await this.pacientesRepository.save(paciente);
  }

async obtenerPorId(id) {
    const paciente = await this.pacientesRepository.findOneBy({
      id: Number(id),
    });
    if (!paciente) {
      throw new NotFoundException(`No se encontró un paciente con id ${id}`);
    }
    return paciente;
  }

async actualizar(id, datosPaciente) {
    const paciente = await this.pacientesRepository.preload({
      id: Number(id),
      ...datosPaciente,
    });
    if (!paciente) {
      throw new NotFoundException(`
        No se encontró un paciente con id ${id}`);
    }
    return await this.pacientesRepository.save(paciente);
  }

async eliminar(id) {
    const resultado = await this.pacientesRepository.delete(Number(id));
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró un paciente con id ${id}`);
    }
    return {
      mensaje: `Paciente con id ${id} eliminado correctamente`,
    };
  }
}
