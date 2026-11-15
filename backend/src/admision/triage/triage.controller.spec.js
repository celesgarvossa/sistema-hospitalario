import { Test } from '@nestjs/testing';

import { TriageController } from './triage.controller';
import { TriageService } from './triage.service';

describe('TriageController', () => {
  let controller;
  let triageServiceMock;

  beforeEach(async () => {
    triageServiceMock = {
      obtenerCola: jest.fn(),
      crear: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [TriageController],
      providers: [
        {
          provide: TriageService,
          useValue: triageServiceMock,
        },
      ],
    }).compile();

    controller = module.get(TriageController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería obtener la cola de triage', async () => {
    const cola = [
      { id: 3, codigo: 'ROJO', prioridad: 1 },
      { id: 2, codigo: 'AMARILLO', prioridad: 2 },
      { id: 1, codigo: 'VERDE', prioridad: 3 },
    ];

    triageServiceMock.obtenerCola.mockResolvedValue(cola);

    const resultado = await controller.obtenerCola();

    expect(triageServiceMock.obtenerCola).toHaveBeenCalled();
    expect(resultado).toEqual(cola);
  });

  it('debería delegar la creación de triage al service', async () => {
    const datos = {
      pacienteId: 4,
      codigo: 'ROJO',
    };

    const registro = {
      id: 1,
      pacienteId: 4,
      codigo: 'ROJO',
      prioridad: 1,
      estado: 'ESPERANDO',
    };

    triageServiceMock.crear.mockResolvedValue(registro);

    const resultado = await controller.crear(datos);

    expect(triageServiceMock.crear).toHaveBeenCalledWith(datos);
    expect(resultado).toEqual(registro);
  });
});