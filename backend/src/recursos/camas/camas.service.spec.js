import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

import { CamasService } from './camas.service';
import { Cama } from './cama.entity';

describe('CamasService', () => {
  let service;

  let camasRepositoryMock;
  let camasTransactionRepositoryMock;
  let managerMock;

  beforeEach(async () => {
    camasTransactionRepositoryMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    managerMock = {
      getRepository: jest.fn(() => {
        return camasTransactionRepositoryMock;
      }),
    };

    camasRepositoryMock = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      manager: {
        transaction: jest.fn(async (callback) => {
          return await callback(managerMock);
        }),
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        CamasService,
        {
          provide: getRepositoryToken(Cama),
          useValue: camasRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(CamasService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe asignar una cama libre a un paciente', async () => {
    const cama = {
      id: 1,
      numero: 'CAMA-101',
      sector: 'Internación',
      estado: 'Libre',
      pacienteId: null,
    };

    camasTransactionRepositoryMock.findOne.mockResolvedValue(
      cama,
    );

    camasTransactionRepositoryMock.save.mockImplementation(
      async (dato) => dato,
    );

    const resultado = await service.asignar(1, 1);

    expect(resultado.estado).toBe('Ocupada');
    expect(resultado.pacienteId).toBe(1);

    expect(
      camasTransactionRepositoryMock.findOne,
    ).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
      lock: {
        mode: 'pessimistic_write',
      },
    });
  });

  it('no debe permitir asignar una cama ocupada', async () => {
    camasTransactionRepositoryMock.findOne.mockResolvedValue({
      id: 1,
      numero: 'CAMA-101',
      sector: 'Internación',
      estado: 'Ocupada',
      pacienteId: 1,
    });

    await expect(
      service.asignar(1, 3),
    ).rejects.toBeInstanceOf(
      BadRequestException,
    );

    expect(
      camasTransactionRepositoryMock.save,
    ).not.toHaveBeenCalled();
  });

  it('debe pasar una cama ocupada a en limpieza al dar el alta', async () => {
    const cama = {
      id: 1,
      numero: 'CAMA-101',
      sector: 'Internación',
      estado: 'Ocupada',
      pacienteId: 1,
    };

    camasRepositoryMock.findOneBy.mockResolvedValue(
      cama,
    );

    camasRepositoryMock.save.mockImplementation(
      async (dato) => dato,
    );

    const resultado =
      await service.darAlta(1);

    expect(resultado.estado).toBe(
      'En limpieza',
    );

    expect(resultado.pacienteId).toBeNull();
  });

  it('debe pasar una cama en limpieza a libre', async () => {
    const cama = {
      id: 1,
      numero: 'CAMA-101',
      sector: 'Internación',
      estado: 'En limpieza',
      pacienteId: null,
    };

    camasRepositoryMock.findOneBy.mockResolvedValue(
      cama,
    );

    camasRepositoryMock.save.mockImplementation(
      async (dato) => dato,
    );

    const resultado =
      await service.finalizarLimpieza(1);

    expect(resultado.estado).toBe('Libre');
    expect(resultado.pacienteId).toBeNull();
  });
});