import { Injectable } from '@nestjs/common';

@Injectable()
export class PacientesService {
  obtenerTodos() {
    return [
      {
        id: 1,
        nombre: 'Carlos',
        apellido: 'Lopez',
      },
      {
        id: 2,
        nombre: 'Ana',
        apellido: 'Rojas',
      },
    ];
  }
}