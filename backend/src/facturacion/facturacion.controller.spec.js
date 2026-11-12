import { Test } from '@nestjs/testing';

import { FacturacionController } from './facturacion.controller';
import { FacturacionService } from './facturacion.service';

describe('FacturacionController', () => {
  let controller;
  let serviceMock;

  beforeEach(async () => {
    serviceMock = {
      obtenerTodos: jest.fn(),
      crearCargo: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [
        FacturacionController,
      ],
      providers: [
        {
          provide: FacturacionService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get(FacturacionController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debe obtener todos los cargos', () => {
    const cargos = [
      {
        id: 1,
        pacienteId: 1,
        tipoCobertura: 'PREPAGA',
        montoFinal: 2000,
      },
    ];

    serviceMock.obtenerTodos.mockReturnValue(cargos);

    const resultado = controller.obtenerTodos();

    expect(resultado).toEqual(cargos);

    expect(
      serviceMock.obtenerTodos,
    ).toHaveBeenCalled();
  });

  it('debe delegar la creacion de un cargo', () => {
    const datos = {
      pacienteId: 1,
      tipoCobertura: 'PARTICULAR',
      concepto: 'Consulta general',
      montoBase: 10000,
    };

    const cargo = {
      id: 1,
      ...datos,
      montoFinal: 10000,
    };

    serviceMock.crearCargo.mockReturnValue(cargo);

    const resultado =
      controller.crearCargo(datos);

    expect(resultado).toEqual(cargo);

    expect(
      serviceMock.crearCargo,
    ).toHaveBeenCalledWith(datos);
  });
});