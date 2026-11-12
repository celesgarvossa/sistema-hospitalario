import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

import { FacturacionService } from './facturacion.service';
import { Cargo } from './cargo.entity';

describe('FacturacionService', () => {
  let service;
  let cargosRepositoryMock;

  beforeEach(async () => {
    cargosRepositoryMock = {
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        FacturacionService,
        {
          provide: getRepositoryToken(Cargo),
          useValue: cargosRepositoryMock,
        },
      ],
    }).compile();

    service = module.get(FacturacionService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe calcular PUBLICO con monto final 0', async () => {
    cargosRepositoryMock.create.mockImplementation(
      (dato) => dato,
    );

    cargosRepositoryMock.save.mockImplementation(
      async (dato) => dato,
    );

    const resultado = await service.crearCargo({
      pacienteId: 1,
      tipoCobertura: 'PUBLICO',
      concepto: 'Consulta general',
      montoBase: 10000,
    });

    expect(resultado.montoFinal).toBe(0);
  });

  it('debe calcular PREPAGA con 20 por ciento', async () => {
    cargosRepositoryMock.create.mockImplementation(
      (dato) => dato,
    );

    cargosRepositoryMock.save.mockImplementation(
      async (dato) => dato,
    );

    const resultado = await service.crearCargo({
      pacienteId: 1,
      tipoCobertura: 'PREPAGA',
      concepto: 'Consulta general',
      montoBase: 10000,
    });

    expect(resultado.montoFinal).toBe(2000);
  });

  it('debe calcular PARTICULAR con el monto completo', async () => {
    cargosRepositoryMock.create.mockImplementation(
      (dato) => dato,
    );

    cargosRepositoryMock.save.mockImplementation(
      async (dato) => dato,
    );

    const resultado = await service.crearCargo({
      pacienteId: 1,
      tipoCobertura: 'PARTICULAR',
      concepto: 'Consulta general',
      montoBase: 10000,
    });

    expect(resultado.montoFinal).toBe(10000);
  });

  it('debe rechazar un tipo de cobertura invalido', async () => {
    await expect(
      service.crearCargo({
        pacienteId: 1,
        tipoCobertura: 'OTRO',
        concepto: 'Consulta general',
        montoBase: 10000,
      }),
    ).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});