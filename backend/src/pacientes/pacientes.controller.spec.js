import { Test } from '@nestjs/testing';

import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

describe('PacientesController', () => {
  let controller;
  let service;

  beforeEach(async () => {
    const pacientesServiceMock = {
      obtenerTodos: jest.fn(),
      obtenerPorId: jest.fn(),
      crear: jest.fn(),
      actualizar: jest.fn(),
      eliminar: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [PacientesController],
      providers: [
        {
          provide: PacientesService,
          useValue: pacientesServiceMock,
        },
      ],
    }).compile();

    controller = module.get(PacientesController);
    service = module.get(PacientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debería delegar obtenerTodos al service', async () => {
  const pacientes = [
    {
      id: 1,
      nombre: 'Carlos',
      apellido: 'Lopez',
      documento: '30111222',
    },
  ];

  service.obtenerTodos.mockResolvedValue(pacientes);

  const resultado = await controller.obtenerTodos();

  expect(service.obtenerTodos).toHaveBeenCalledTimes(1);
  expect(resultado).toEqual(pacientes);
});

it('debería delegar crear al service', async () => {
  const datosPaciente = {
    nombre: 'Ana',
    apellido: 'Rojas',
    documento: '32999888',
  };

  const pacienteCreado = {
    id: 2,
    ...datosPaciente,
  };

  service.crear.mockResolvedValue(pacienteCreado);

  const resultado = await controller.crear(datosPaciente);

  expect(service.crear).toHaveBeenCalledWith(datosPaciente);
  expect(resultado).toEqual(pacienteCreado);
});

it('debería delegar obtenerPorId al service', async () => {
  const paciente = {
    id: 1,
    nombre: 'Carlos',
    apellido: 'Lopez',
    documento: '30111222',
  };

  service.obtenerPorId.mockResolvedValue(paciente);

  const resultado = await controller.obtenerPorId('1');

  expect(service.obtenerPorId).toHaveBeenCalledWith('1');
  expect(resultado).toEqual(paciente);
});

it('debería delegar actualizar al service', async () => {
  const datosActualizacion = {
    nombre: 'Carlos Alberto',
  };

  const pacienteActualizado = {
    id: 1,
    nombre: 'Carlos Alberto',
    apellido: 'Lopez',
    documento: '30111222',
  };

  service.actualizar.mockResolvedValue(pacienteActualizado);

  const resultado = await controller.actualizar(
    '1',
    datosActualizacion,
  );

  expect(service.actualizar).toHaveBeenCalledWith(
    '1',
    datosActualizacion,
  );

  expect(resultado).toEqual(pacienteActualizado);
});

it('debería delegar eliminar al service', async () => {
  const respuesta = {
    mensaje: 'Paciente con id 2 eliminado correctamente',
  };

  service.eliminar.mockResolvedValue(respuesta);

  const resultado = await controller.eliminar('2');

  expect(service.eliminar).toHaveBeenCalledWith('2');
  expect(resultado).toEqual(respuesta);
});

});