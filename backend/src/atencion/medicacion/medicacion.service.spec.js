import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { MedicacionService } from './medicacion.service';
import { AdministracionMedicacion } from './administracion-medicacion.entity';
import { Medicamento } from '../../recursos/inventario/medicamento.entity';

describe('MedicacionService', () => {
  let service;

  let administracionRepositoryMock;
  let medicamentosRepositoryMock;
  let administracionesTransactionRepositoryMock;
  let managerMock;
  let eventEmitterMock;

  beforeEach(async () => {
    medicamentosRepositoryMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    administracionesTransactionRepositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
    };

    managerMock = {
      getRepository: jest.fn((entidad) => {
        if (entidad === Medicamento) {
          return medicamentosRepositoryMock;
        }

        if (entidad === AdministracionMedicacion) {
          return administracionesTransactionRepositoryMock;
        }
      }),
    };

    administracionRepositoryMock = {
      find: jest.fn(),
      manager: {
        transaction: jest.fn(async (callback) => {
          return await callback(managerMock);
        }),
      },
    };

    eventEmitterMock = {
      emit: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        MedicacionService,
        {
          provide: getRepositoryToken(
            AdministracionMedicacion,
          ),
          useValue: administracionRepositoryMock,
        },
        {
          provide: EventEmitter2,
          useValue: eventEmitterMock,
        },
      ],
    }).compile();

    service = module.get(MedicacionService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe obtener todas las administraciones', async () => {
    const registros = [
      {
        id: 1,
        pacienteId: 1,
        medicamentoId: 1,
      },
    ];

    administracionRepositoryMock.find.mockResolvedValue(
      registros,
    );

    const resultado =
      await service.obtenerTodas();

    expect(resultado).toEqual(registros);
  });

  it('debe administrar medicacion, descontar stock y emitir evento', async () => {
    const medicamento = {
      id: 1,
      nombre: 'Paracetamol 500 mg',
      stock: 20,
      activo: true,
    };

    medicamentosRepositoryMock.findOne.mockResolvedValue(
      medicamento,
    );

    medicamentosRepositoryMock.save.mockImplementation(
      async (dato) => dato,
    );

    administracionesTransactionRepositoryMock.create.mockImplementation(
      (dato) => dato,
    );

    administracionesTransactionRepositoryMock.save.mockImplementation(
      async (dato) => ({
        id: 10,
        ...dato,
      }),
    );

    const resultado = await service.crear({
      pacienteId: 1,
      medicamentoId: 1,
      enfermeroId: 1,
      cantidad: 2,
      horarioProgramado:
        '2026-11-12T10:00:00.000Z',
      horarioAdministracion:
        '2026-11-12T10:20:00.000Z',
      tipoCobertura: 'PREPAGA',
      montoBase: 5000,
    });

    expect(resultado.dentroVentana).toBe(true);
    expect(medicamento.stock).toBe(18);

    expect(
      eventEmitterMock.emit,
    ).toHaveBeenCalledWith(
      'medicacion.administrada',
      expect.objectContaining({
        administracionId: 10,
        pacienteId: 1,
        tipoCobertura: 'PREPAGA',
        montoBase: 5000,
      }),
    );
  });

  it('debe marcar fuera de ventana cuando pasan mas de 30 minutos', async () => {
    const medicamento = {
      id: 1,
      nombre: 'Paracetamol 500 mg',
      stock: 20,
      activo: true,
    };

    medicamentosRepositoryMock.findOne.mockResolvedValue(
      medicamento,
    );

    medicamentosRepositoryMock.save.mockImplementation(
      async (dato) => dato,
    );

    administracionesTransactionRepositoryMock.create.mockImplementation(
      (dato) => dato,
    );

    administracionesTransactionRepositoryMock.save.mockImplementation(
      async (dato) => ({
        id: 11,
        ...dato,
      }),
    );

    const resultado = await service.crear({
      pacienteId: 1,
      medicamentoId: 1,
      enfermeroId: 1,
      cantidad: 1,
      horarioProgramado:
        '2026-11-12T10:00:00.000Z',
      horarioAdministracion:
        '2026-11-12T10:45:00.000Z',
      tipoCobertura: 'PARTICULAR',
      montoBase: 5000,
    });

    expect(resultado.dentroVentana).toBe(false);
    expect(medicamento.stock).toBe(19);
  });

  it('debe rechazar la administracion si no hay stock suficiente', async () => {
    medicamentosRepositoryMock.findOne.mockResolvedValue({
      id: 1,
      nombre: 'Paracetamol 500 mg',
      stock: 1,
      activo: true,
    });

    await expect(
      service.crear({
        pacienteId: 1,
        medicamentoId: 1,
        enfermeroId: 1,
        cantidad: 2,
        horarioProgramado:
          '2026-11-12T10:00:00.000Z',
        horarioAdministracion:
          '2026-11-12T10:10:00.000Z',
        tipoCobertura: 'PREPAGA',
        montoBase: 5000,
      }),
    ).rejects.toBeInstanceOf(
      BadRequestException,
    );

    expect(
      medicamentosRepositoryMock.save,
    ).not.toHaveBeenCalled();

    expect(
      administracionesTransactionRepositoryMock.save,
    ).not.toHaveBeenCalled();

    expect(
      eventEmitterMock.emit,
    ).not.toHaveBeenCalled();
  });

  it('debe rechazar datos obligatorios faltantes', async () => {
    await expect(
      service.crear({
        pacienteId: 1,
      }),
    ).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});