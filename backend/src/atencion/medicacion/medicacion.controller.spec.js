import { Test } from '@nestjs/testing';

import { MedicacionController } from './medicacion.controller';
import { MedicacionService } from './medicacion.service';

describe('MedicacionController', () => {
  let controller;
  let medicacionServiceMock;

  beforeEach(async () => {
    medicacionServiceMock = {
      obtenerTodas: jest.fn(),
      crear: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [MedicacionController],
      providers: [
        {
          provide: MedicacionService,
          useValue: medicacionServiceMock,
        },
      ],
    }).compile();

    controller = module.get(MedicacionController);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
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

    medicacionServiceMock.obtenerTodas.mockResolvedValue(registros);

    const resultado = await controller.obtenerTodas();

    expect(medicacionServiceMock.obtenerTodas).toHaveBeenCalled();
    expect(resultado).toEqual(registros);
  });

  it('debería delegar la creación al service', async () => {
    const datos = {
      pacienteId: 1,
      medicamentoId: 1,
      enfermeroId: 1,
      cantidad: 1,
      horarioProgramado: '2026-11-10T10:00:00',
      horarioAdministracion: '2026-11-10T10:20:00',
    };

    const registro = {
      id: 1,
      ...datos,
      dentroVentana: true,
    };

    medicacionServiceMock.crear.mockResolvedValue(registro);

    const resultado = await controller.crear(datos);

    expect(medicacionServiceMock.crear).toHaveBeenCalledWith(datos);
    expect(resultado).toEqual(registro);
  });
});