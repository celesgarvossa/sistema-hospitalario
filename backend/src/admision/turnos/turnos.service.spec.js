import { Test } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TurnosService } from './turnos.service';
import { Turno } from './turno.entity';

describe('TurnosService', () => {
  let service;
  let repositoryMock;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        TurnosService,
        {
          provide: getRepositoryToken(Turno),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(TurnosService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
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

    repositoryMock.find.mockResolvedValue(turnos);

    const resultado = await service.obtenerTodos();

    expect(resultado).toEqual(turnos);
    expect(repositoryMock.find).toHaveBeenCalled();
  });

  it('debería crear un turno válido', async () => {
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

    repositoryMock.create.mockReturnValue(turnoCreado);
    repositoryMock.save.mockResolvedValue(turnoCreado);

    const resultado = await service.crear(datosTurno);

    expect(repositoryMock.create).toHaveBeenCalledWith({
      agendaId: 1,
      pacienteId: 1,
      horaInicio: '10:00:00',
      horaFin: '10:30:00',
      estado: 'Programado',
      tipo: 'NORMAL',
      duracionReducida: false,
      version: 1,
    });

    expect(repositoryMock.save).toHaveBeenCalledWith(turnoCreado);
    expect(resultado).toEqual(turnoCreado);
  });

  it('debería rechazar un turno con datos obligatorios faltantes', async () => {
    await expect(
      service.crear({
        agendaId: 1,
        pacienteId: 1,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repositoryMock.create).not.toHaveBeenCalled();
    expect(repositoryMock.save).not.toHaveBeenCalled();
  });

  it('debería devolver conflicto si el horario ya está reservado', async () => {
    repositoryMock.create.mockReturnValue({
      agendaId: 1,
      pacienteId: 1,
      horaInicio: '10:00:00',
      horaFin: '10:30:00',
      estado: 'Programado',
      tipo: 'NORMAL',
      duracionReducida: false,
      version: 1,
    });

    repositoryMock.save.mockRejectedValue({
      code: 'ER_DUP_ENTRY',
    });

    await expect(
      service.crear({
        agendaId: 1,
        pacienteId: 1,
        horaInicio: '10:00:00',
        horaFin: '10:30:00',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});