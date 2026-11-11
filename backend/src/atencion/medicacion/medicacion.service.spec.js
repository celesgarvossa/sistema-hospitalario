import { Test } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MedicacionService } from './medicacion.service';
import { AdministracionMedicacion } from './administracion-medicacion.entity';

describe('MedicacionService', () => {
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
        MedicacionService,
        {
          provide: getRepositoryToken(AdministracionMedicacion),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(MedicacionService);
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería obtener todas las administraciones', async () => {
    const registros = [
      {
        id: 1,
        pacienteId: 1,
        medicamentoId: 1,
        enfermeroId: 1,
        dentroVentana: true,
      },
    ];

    repositoryMock.find.mockResolvedValue(registros);

    const resultado = await service.obtenerTodas();

    expect(repositoryMock.find).toHaveBeenCalled();
    expect(resultado).toEqual(registros);
  });

  it('debería marcar dentroVentana true con 20 minutos de diferencia', async () => {
    const registro = {
      id: 1,
      pacienteId: 1,
      medicamentoId: 1,
      enfermeroId: 1,
      cantidad: 1,
      dentroVentana: true,
    };

    repositoryMock.create.mockReturnValue(registro);
    repositoryMock.save.mockResolvedValue(registro);

    const resultado = await service.crear({
      pacienteId: 1,
      medicamentoId: 1,
      enfermeroId: 1,
      cantidad: 1,
      horarioProgramado: '2026-11-10T10:00:00',
      horarioAdministracion: '2026-11-10T10:20:00',
    });

    expect(repositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        pacienteId: 1,
        medicamentoId: 1,
        enfermeroId: 1,
        cantidad: 1,
        dentroVentana: true,
      }),
    );

    expect(resultado.dentroVentana).toBe(true);
  });

  it('debería marcar dentroVentana false con 45 minutos de diferencia', async () => {
    const registro = {
      id: 2,
      pacienteId: 1,
      medicamentoId: 1,
      enfermeroId: 1,
      cantidad: 1,
      dentroVentana: false,
    };

    repositoryMock.create.mockReturnValue(registro);
    repositoryMock.save.mockResolvedValue(registro);

    const resultado = await service.crear({
      pacienteId: 1,
      medicamentoId: 1,
      enfermeroId: 1,
      cantidad: 1,
      horarioProgramado: '2026-11-10T10:00:00',
      horarioAdministracion: '2026-11-10T10:45:00',
    });

    expect(resultado.dentroVentana).toBe(false);
  });

  it('debería rechazar datos obligatorios faltantes', async () => {
    await expect(
      service.crear({
        pacienteId: 1,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);

    expect(repositoryMock.create).not.toHaveBeenCalled();
    expect(repositoryMock.save).not.toHaveBeenCalled();
  });
});
