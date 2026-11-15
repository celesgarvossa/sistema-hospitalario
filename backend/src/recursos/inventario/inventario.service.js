import {
  Injectable,
  Dependencies,
  BadRequestException,
} from '@nestjs/common';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicamento } from './medicamento.entity';

@Injectable()
@Dependencies(getRepositoryToken(Medicamento))
export class InventarioService {
  constructor(medicamentosRepository) {
    this.medicamentosRepository = medicamentosRepository;
  }

  obtenerTodos() {
    return this.medicamentosRepository.find();
  }

  async crear(datos) {
    if (!datos.nombre) {
      throw new BadRequestException(
        'nombre es obligatorio',
      );
    }

    const stock = Number(datos.stock ?? 0);

    if (stock < 0) {
      throw new BadRequestException(
        'El stock no puede ser negativo',
      );
    }

    const medicamento = this.medicamentosRepository.create({
      nombre: datos.nombre,
      descripcion: datos.descripcion ?? null,
      stock,
      activo: datos.activo ?? true,
    });

    return await this.medicamentosRepository.save(
      medicamento,
    );
  }
}