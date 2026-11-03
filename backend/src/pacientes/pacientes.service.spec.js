import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PacientesService } from './pacientes.service';
import { Paciente } from './paciente.entity';

describe('PacientesService', () => {
  let service;
  let repository;

  beforeEach(async () => {
    const repositoryMock = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      preload: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        PacientesService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(PacientesService);
    repository = module.get(getRepositoryToken(Paciente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería devolver todos los pacientes', async () => {
    const pacientes = [
      {
        id: 1,
        nombre: 'Carlos',
        apellido: 'Lopez',
        documento: '30111222',
      },
      {
        id: 2,
        nombre: 'Ana',
        apellido: 'Rojas',
        documento: '32999888',
      },
    ];

    repository.find.mockResolvedValue(pacientes);

    const resultado = await service.obtenerTodos();

    expect(repository.find).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(pacientes);
  });

  it('debería crear un paciente válido', async () => {
    const datosPaciente = {
      nombre: 'Ana',
      apellido: 'Rojas',
      documento: '32999888',
      fechaNacimiento: '1990-08-20',
    };

    const pacienteCreado = {
      id: 1,
      ...datosPaciente,
    };

    repository.create.mockReturnValue(datosPaciente);
    repository.save.mockResolvedValue(pacienteCreado);

    const resultado = await service.crear(datosPaciente);

    expect(repository.create).toHaveBeenCalledWith(datosPaciente);
    expect(repository.save).toHaveBeenCalledWith(datosPaciente);
    expect(resultado).toEqual(pacienteCreado);
  });

  it('debería rechazar un paciente sin datos obligatorios', async () => {
    const datosInvalidos = {
      nombre: '',
      apellido: 'Perez',
      documento: '',
    };

    await expect(service.crear(datosInvalidos)).rejects.toThrow(
      'Nombre, apellido y documento son obligatorios',
    );

    expect(repository.create).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('debería devolver un paciente por id', async () => {
  const paciente = {
    id: 1,
    nombre: 'Carlos',
    apellido: 'Lopez',
    documento: '30111222',
  };

  repository.findOneBy.mockResolvedValue(paciente);

  const resultado = await service.obtenerPorId(1);

  expect(repository.findOneBy).toHaveBeenCalledWith({
    id: 1,
  });

  expect(resultado).toEqual(paciente);
});

it('debería lanzar 404 si el paciente no existe', async () => {
  repository.findOneBy.mockResolvedValue(null);

  await expect(service.obtenerPorId(9999)).rejects.toThrow(
    'No se encontró un paciente con id 9999',
  );
});

it('debería actualizar un paciente existente', async () => {
  const pacienteActualizado = {
    id: 1,
    nombre: 'Carlos Alberto',
    apellido: 'Lopez',
    documento: '30111222',
  };

  repository.preload.mockResolvedValue(pacienteActualizado);
  repository.save.mockResolvedValue(pacienteActualizado);

  const resultado = await service.actualizar(1, {
    nombre: 'Carlos Alberto',
  });

  expect(repository.preload).toHaveBeenCalledWith({
    id: 1,
    nombre: 'Carlos Alberto',
  });

  expect(repository.save).toHaveBeenCalledWith(pacienteActualizado);
  expect(resultado).toEqual(pacienteActualizado);
});

it('debería lanzar 404 al actualizar un paciente inexistente', async () => {
  repository.preload.mockResolvedValue(undefined);

  await expect(
    service.actualizar(9999, {
      nombre: 'Nombre Nuevo',
    }),
  ).rejects.toThrow(
    'No se encontró un paciente con id 9999',
  );

  expect(repository.save).not.toHaveBeenCalled();
});

it('debería eliminar un paciente existente', async () => {
  repository.delete.mockResolvedValue({
    affected: 1,
  });

  const resultado = await service.eliminar(2);

  expect(repository.delete).toHaveBeenCalledWith(2);

  expect(resultado).toEqual({
    mensaje: 'Paciente con id 2 eliminado correctamente',
  });
});

it('debería lanzar 404 al eliminar un paciente inexistente', async () => {
  repository.delete.mockResolvedValue({
    affected: 0,
  });

  await expect(service.eliminar(9999)).rejects.toThrow(
    'No se encontró un paciente con id 9999',
  );
});

});