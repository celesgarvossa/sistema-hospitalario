import { Test } from '@nestjs/testing';

import { AgendasController } from './agendas.controller';
import { AgendasService } from './agendas.service';

describe('AgendasController', () => {
  let controller;
  let agendasServiceMock;

  beforeEach(async () => {
    agendasServiceMock = {
      obtenerTodas: jest.fn(),
      crear: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [AgendasController],
      providers: [
        {
          provide: AgendasService,
          useValue: agendasServiceMock,
        },
      ],
    }).compile();

    controller = module.get(AgendasController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería obtener todas las agendas', async () => {
    const agendas = [
      {
        id: 1,
        medicoId: 15,
        fecha: '2026-11-10',
        activa: true,
      },
    ];

    agendasServiceMock.obtenerTodas.mockResolvedValue(agendas);

    const resultado = await controller.obtenerTodas();

    expect(agendasServiceMock.obtenerTodas).toHaveBeenCalled();
    expect(resultado).toEqual(agendas);
  });

  it('debería delegar la creación de una agenda al service', async () => {
    const datosAgenda = {
      medicoId: 15,
      fecha: '2026-11-10',
    };

    const agendaCreada = {
      id: 1,
      medicoId: 15,
      fecha: '2026-11-10',
      activa: true,
    };

    agendasServiceMock.crear.mockResolvedValue(agendaCreada);

    const resultado = await controller.crear(datosAgenda);

    expect(agendasServiceMock.crear).toHaveBeenCalledWith(datosAgenda);
    expect(resultado).toEqual(agendaCreada);
  });
});