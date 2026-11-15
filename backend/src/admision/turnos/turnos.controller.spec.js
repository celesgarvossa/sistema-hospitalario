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
      confirmar: jest.fn(),
      ingresarSalaEspera: jest.fn(),
      atender: jest.fn(),
      cancelar: jest.fn(),
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

  it('debería delegar la confirmación de un turno al service', async () => {
  const turnoConfirmado = {
    id: 1,
    estado: 'Confirmado',
  };

  turnosServiceMock.confirmar.mockResolvedValue(turnoConfirmado);

  const resultado = await controller.confirmar('1');

  expect(turnosServiceMock.confirmar).toHaveBeenCalledWith('1');
  expect(resultado).toEqual(turnoConfirmado);
});

  it('debería delegar el ingreso a sala de espera al service', async () => {
    const turnoEnSala = {
      id: 1,
      estado: 'En Sala de Espera',
    };

    turnosServiceMock.ingresarSalaEspera.mockResolvedValue(turnoEnSala);

    const resultado = await controller.ingresarSalaEspera('1');

    expect(turnosServiceMock.ingresarSalaEspera).toHaveBeenCalledWith('1');
    expect(resultado).toEqual(turnoEnSala);
  });

  it('debería delegar la atención de un turno al service', async () => {
    const turnoAtendido = {
      id: 1,
      estado: 'Atendido',
    };

    turnosServiceMock.atender.mockResolvedValue(turnoAtendido);

    const resultado = await controller.atender('1');

    expect(turnosServiceMock.atender).toHaveBeenCalledWith('1');
    expect(resultado).toEqual(turnoAtendido);
  });

  it('debería delegar la cancelación de un turno al service', async () => {
    const turnoCancelado = {
      id: 2,
      estado: 'Cancelado',
    };

    turnosServiceMock.cancelar.mockResolvedValue(turnoCancelado);

    const resultado = await controller.cancelar('2');

    expect(turnosServiceMock.cancelar).toHaveBeenCalledWith('2');
    expect(resultado).toEqual(turnoCancelado);
  });
});