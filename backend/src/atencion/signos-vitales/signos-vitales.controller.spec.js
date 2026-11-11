import { Test } from '@nestjs/testing';

import { SignosVitalesController } from './signos-vitales.controller';
import { SignosVitalesService } from './signos-vitales.service';

describe('SignosVitalesController', () => {
  let controller;
  let signosVitalesServiceMock;

  beforeEach(async () => {
    signosVitalesServiceMock = {
      obtenerTodos: jest.fn(),
      crear: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [SignosVitalesController],
      providers: [
        {
          provide: SignosVitalesService,
          useValue: signosVitalesServiceMock,
        },
      ],
    }).compile();

    controller = module.get(SignosVitalesController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería obtener todos los signos vitales', async () => {
    const registros = [
      {
        id: 1,
        pacienteId: 1,
        temperatura: 38.5,
        alertaTemperatura: false,
      },
    ];

    signosVitalesServiceMock.obtenerTodos.mockResolvedValue(registros);

    const resultado = await controller.obtenerTodos();

    expect(signosVitalesServiceMock.obtenerTodos).toHaveBeenCalled();
    expect(resultado).toEqual(registros);
  });

  it('debería delegar la creación al service', async () => {
    const datos = {
      pacienteId: 1,
      temperatura: 39.5,
    };

    const registro = {
      id: 2,
      pacienteId: 1,
      temperatura: 39.5,
      alertaTemperatura: true,
    };

    signosVitalesServiceMock.crear.mockResolvedValue(registro);

    const resultado = await controller.crear(datos);

    expect(signosVitalesServiceMock.crear).toHaveBeenCalledWith(datos);
    expect(resultado).toEqual(registro);
  });
});