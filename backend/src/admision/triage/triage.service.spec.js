import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TriageService } from './triage.service';
import { Triage } from './triage.entity';

describe('TriageService', () => {
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
        TriageService,
        {
          provide: getRepositoryToken(Triage),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(TriageService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería obtener la cola ordenada por prioridad', async () => {
    const cola = [
      { id: 3, codigo: 'ROJO', prioridad: 1 },
      { id: 2, codigo: 'AMARILLO', prioridad: 2 },
      { id: 1, codigo: 'VERDE', prioridad: 3 },
    ];

    repositoryMock.find.mockResolvedValue(cola);

    const resultado = await service.obtenerCola();

    expect(repositoryMock.find).toHaveBeenCalledWith({
      where: {
        estado: 'ESPERANDO',
      },
      order: {
        prioridad: 'ASC',
        creadoEn: 'ASC',
        id: 'ASC',
      },
    });

    expect(resultado).toEqual(cola);
  });

  it('debería crear un triage ROJO con prioridad 1', async () => {
    const registro = {
      id: 1,
      pacienteId: 4,
      codigo: 'ROJO',
      prioridad: 1,
      estado: 'ESPERANDO',
    };

    repositoryMock.create.mockReturnValue(registro);
    repositoryMock.save.mockResolvedValue(registro);

    const resultado = await service.crear({
      pacienteId: 4,
      codigo: 'ROJO',
    });

    expect(repositoryMock.create).toHaveBeenCalledWith({
      pacienteId: 4,
      codigo: 'ROJO',
      prioridad: 1,
      estado: 'ESPERANDO',
    });

    expect(resultado).toEqual(registro);
  });

  it('debería rechazar un código de triage inválido', async () => {
    await expect(
      service.crear({
        pacienteId: 1,
        codigo: 'AZUL',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repositoryMock.create).not.toHaveBeenCalled();
    expect(repositoryMock.save).not.toHaveBeenCalled();
  });
});