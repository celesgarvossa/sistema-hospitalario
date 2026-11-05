import { Test } from '@nestjs/testing';

import { TurnosController } from './turnos.controller';
import { TurnosService } from './turnos.service';

describe('TurnosController', () => {
  let controller;
  let turnosServiceMock;

  beforeEach(async () => {
    turnosServiceMock = {
      obtenerTodos: jest.fn(),
      crear: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [TurnosController],
      providers: [
        {
          provide: TurnosService,
          useValue: turnosServiceMock,
        },
      ],
    }).compile();

    controller = module.get(TurnosController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería obtener todos los turnos', async () => {
    const turnos = [
      {
        id: 1,
        agendaId: 1,
        pacienteId: 1,
        horaInicio: '10:00:00',
        horaFin: '10:30:00',
        estado: 'Programado',
        tipo: 'NORMAL',
      },
    ];

    turnosServiceMock.obtenerTodos.mockResolvedValue(turnos);

    const resultado = await controller.obtenerTodos();

    expect(turnosServiceMock.obtenerTodos).toHaveBeenCalled();
    expect(resultado).toEqual(turnos);
  });

  it('debería delegar la creación de un turno al service', async () => {
    const datosTurno = {
      agendaId: 1,
      pacienteId: 1,
      horaInicio: '10:00:00',
      horaFin: '10:30:00',
    };

    const turnoCreado = {
      id: 1,
      agendaId: 1,
      pacienteId: 1,
      horaInicio: '10:00:00',
      horaFin: '10:30:00',
      estado: 'Programado',
      tipo: 'NORMAL',
      duracionReducida: false,
      version: 1,
    };

    turnosServiceMock.crear.mockResolvedValue(turnoCreado);

    const resultado = await controller.crear(datosTurno);

    expect(turnosServiceMock.crear).toHaveBeenCalledWith(datosTurno);
    expect(resultado).toEqual(turnoCreado);
  });
});