import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

import { CamasService } from './camas.service';
import { Cama } from './cama.entity';

import { EventEmitter2 } from '@nestjs/event-emitter';

describe('CamasService', () => {
  let service;

  let camasRepositoryMock;
  let camasTransactionRepositoryMock;
  let managerMock;
  let eventEmitterMock;

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
    eventEmitterMock={
      emitAsync: jest.fn().mockResolvedValue([
        {
          nombre: 'Protocolo Preoperatorio',
          pasos:[
            'Verificar ayuno de 8 horas',
            'Colocar vía intravenosa periférica',
            'Realizar control de signos vitales cada 2 horas',
          ],
        },
      ]),
    };
    const module = await Test.createTestingModule({
      providers: [
        CamasService,
        {
          provide: getRepositoryToken(Cama),
          useValue: camasRepositoryMock,
        },
        {
          provide: EventEmitter2,
          useValue: eventEmitterMock,
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

    const resultado = await service.asignar(
      1,
      1,
      'PREQUIRURGICO',
    );

    expect(resultado.cama.estado).toBe('Ocupada');
    expect(resultado.cama.pacienteId).toBe(1);
    expect (resultado.protocolo).toEqual({
      nombre: 'Protocolo Preoperatorio',
      pasos:[
        'Verificar ayuno de 8 horas',
        'Colocar vía intravenosa periférica',
        'Realizar control de signos vitales cada 2 horas',
      ],
    });

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
      service.asignar(
        1, 
        3,
        'PREQUIRURGICO',
    ),
    
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

  it('debe bloquear una cama libre', async () => {
  const cama = {
    id: 1,
    numero: 'CAMA-101',
    sector: 'Internación',
    estado: 'Libre',
    pacienteId: null,
  };

  camasRepositoryMock.findOneBy.mockResolvedValue(
    cama,
  );

  camasRepositoryMock.save.mockImplementation(
    async (dato) => dato,
  );

  const resultado =
    await service.bloquear(1);

  expect(resultado.estado).toBe('Bloqueada');
  expect(resultado.pacienteId).toBeNull();
});

it('debe desbloquear una cama bloqueada', async () => {
  const cama = {
    id: 1,
    numero: 'CAMA-101',
    sector: 'Internación',
    estado: 'Bloqueada',
    pacienteId: null,
  };

  camasRepositoryMock.findOneBy.mockResolvedValue(
    cama,
  );

  camasRepositoryMock.save.mockImplementation(
    async (dato) => dato,
  );

  const resultado =
    await service.desbloquear(1);

  expect(resultado.estado).toBe('Libre');
  expect(resultado.pacienteId).toBeNull();
});
});