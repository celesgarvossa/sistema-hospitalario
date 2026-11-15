import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { SignosVitalesService } from './signos-vitales.service';
import { SignoVital } from './signo-vital.entity';

describe('SignosVitalesService', () => {
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
        SignosVitalesService,
        {
          provide: getRepositoryToken(SignoVital),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(SignosVitalesService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
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

    repositoryMock.find.mockResolvedValue(registros);

    const resultado = await service.obtenerTodos();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(resultado).toEqual(registros);
  });

  it('no debería generar alerta con temperatura de 38.5', async () => {
    const registro = {
      id: 1,
      pacienteId: 1,
      temperatura: 38.5,
      alertaTemperatura: false,
    };

    repositoryMock.create.mockReturnValue(registro);
    repositoryMock.save.mockResolvedValue(registro);

    const resultado = await service.crear({
      pacienteId: 1,
      temperatura: 38.5,
    });

    expect(repositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        pacienteId: 1,
        temperatura: 38.5,
        alertaTemperatura: false,
      }),
    );

    expect(resultado.alertaTemperatura).toBe(false);
  });

  it('debería generar alerta con temperatura mayor a 39', async () => {
    const registro = {
      id: 2,
      pacienteId: 1,
      temperatura: 39.5,
      alertaTemperatura: true,
    };

    repositoryMock.create.mockReturnValue(registro);
    repositoryMock.save.mockResolvedValue(registro);

    const resultado = await service.crear({
      pacienteId: 1,
      temperatura: 39.5,
    });

    expect(repositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        pacienteId: 1,
        temperatura: 39.5,
        alertaTemperatura: true,
      }),
    );

    expect(resultado.alertaTemperatura).toBe(true);
  });

  it('debería rechazar un registro sin pacienteId', async () => {
    await expect(
      service.crear({
        temperatura: 38.5,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repositoryMock.create).not.toHaveBeenCalled();
    expect(repositoryMock.save).not.toHaveBeenCalled();
  });
});