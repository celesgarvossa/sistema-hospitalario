import { Test } from '@nestjs/testing';

import { CamasController } from './camas.controller';
import { CamasService } from './camas.service';

describe('CamasController', () => {
  let controller;
  let serviceMock;

  beforeEach(async () => {
    serviceMock = {
      obtenerTodas: jest.fn(),
      crear: jest.fn(),
      asignar: jest.fn(),
      darAlta: jest.fn(),
      finalizarLimpieza: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [
        CamasController,
      ],
      providers: [
        {
          provide: CamasService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get(CamasController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debe obtener todas las camas', () => {
    const camas = [
      {
        id: 1,
        numero: 'CAMA-101',
        estado: 'Libre',
      },
    ];

    serviceMock.obtenerTodas.mockReturnValue(camas);

    const resultado = controller.obtenerTodas();

    expect(resultado).toEqual(camas);
    expect(
      serviceMock.obtenerTodas,
    ).toHaveBeenCalled();
  });

  it('debe delegar la asignacion de una cama', () => {
    const cama = {
      id: 1,
      numero: 'CAMA-101',
      estado: 'Ocupada',
      pacienteId: 1,
    };

    serviceMock.asignar.mockReturnValue(cama);

    const resultado = controller.asignar(
      1,
      {
        pacienteId: 1,
      },
    );

    expect(resultado).toEqual(cama);

    expect(
      serviceMock.asignar,
    ).toHaveBeenCalledWith(
      1,
      1,
    );
  });

  it('debe delegar el alta de una cama', () => {
    const cama = {
      id: 1,
      numero: 'CAMA-101',
      estado: 'En limpieza',
      pacienteId: null,
    };

    serviceMock.darAlta.mockReturnValue(cama);

    const resultado =
      controller.darAlta(1);

    expect(resultado).toEqual(cama);

    expect(
      serviceMock.darAlta,
    ).toHaveBeenCalledWith(1);
  });

  it('debe delegar la finalizacion de limpieza', () => {
    const cama = {
      id: 1,
      numero: 'CAMA-101',
      estado: 'Libre',
      pacienteId: null,
    };

    serviceMock.finalizarLimpieza.mockReturnValue(
      cama,
    );

    const resultado =
      controller.finalizarLimpieza(1);

    expect(resultado).toEqual(cama);

    expect(
      serviceMock.finalizarLimpieza,
    ).toHaveBeenCalledWith(1);
  });
});