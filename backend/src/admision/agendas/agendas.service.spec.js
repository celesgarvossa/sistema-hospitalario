import { Test } from '@nestjs/testing';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AgendasService } from './agendas.service';
import { Agenda } from './agenda.entity';

describe('AgendasService', () => {
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
        AgendasService,
        {
          provide: getRepositoryToken(Agenda),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(AgendasService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
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

    repositoryMock.find.mockResolvedValue(agendas);

    const resultado = await service.obtenerTodas();

    expect(resultado).toEqual(agendas);
    expect(repositoryMock.find).toHaveBeenCalled();
  });

  it('debería crear una agenda válida', async () => {
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

    repositoryMock.create.mockReturnValue(agendaCreada);
    repositoryMock.save.mockResolvedValue(agendaCreada);

    const resultado = await service.crear(datosAgenda);

    expect(repositoryMock.create).toHaveBeenCalledWith({
      medicoId: 15,
      fecha: '2026-11-10',
      activa: true,
    });

    expect(repositoryMock.save).toHaveBeenCalledWith(agendaCreada);
    expect(resultado).toEqual(agendaCreada);
  });

  it('debería rechazar una agenda sin medicoId', async () => {
    await expect(
      service.crear({
        fecha: '2026-11-10',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repositoryMock.create).not.toHaveBeenCalled();
    expect(repositoryMock.save).not.toHaveBeenCalled();
  });

  it('debería rechazar una agenda sin fecha', async () => {
    await expect(
      service.crear({
        medicoId: 15,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repositoryMock.create).not.toHaveBeenCalled();
    expect(repositoryMock.save).not.toHaveBeenCalled();
  });

  it('debería devolver conflicto si la agenda está duplicada', async () => {
    repositoryMock.create.mockReturnValue({
      medicoId: 15,
      fecha: '2026-11-10',
      activa: true,
    });

    repositoryMock.save.mockRejectedValue({
      code: 'ER_DUP_ENTRY',
    });

    await expect(
      service.crear({
        medicoId: 15,
        fecha: '2026-11-10',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
