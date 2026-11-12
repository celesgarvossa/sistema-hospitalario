import { Test } from '@nestjs/testing';

import { ProtocolosController } from './protocolos.controller';
import { ProtocolosService } from './protocolos.service';

describe('ProtocolosController', () => {
  let controller;
  let serviceMock;

  beforeEach(async () => {
    serviceMock = {
      obtenerPreoperatorio: jest.fn(),
      obtenerRespiratorio: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [
        ProtocolosController,
      ],
      providers: [
        {
          provide: ProtocolosService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get(ProtocolosController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debe obtener el protocolo preoperatorio', () => {
    const protocolo = {
      nombre: 'Protocolo Preoperatorio',
      pasos: [
        'Verificar ayuno',
      ],
    };

    serviceMock.obtenerPreoperatorio.mockReturnValue(
      protocolo,
    );

    const resultado =
      controller.obtenerPreoperatorio();

    expect(resultado).toEqual(protocolo);

    expect(
      serviceMock.obtenerPreoperatorio,
    ).toHaveBeenCalled();
  });

  it('debe obtener el protocolo respiratorio', () => {
    const protocolo = {
      nombre: 'Protocolo Respiratorio',
      pasos: [
        'Controlar saturación de oxígeno',
      ],
    };

    serviceMock.obtenerRespiratorio.mockReturnValue(
      protocolo,
    );

    const resultado =
      controller.obtenerRespiratorio();

    expect(resultado).toEqual(protocolo);

    expect(
      serviceMock.obtenerRespiratorio,
    ).toHaveBeenCalled();
  });
});