import { Test } from '@nestjs/testing';

import { MedicacionAdministradaListener } from './medicacion-administrada.listener';
import { FacturacionService } from './facturacion.service';

describe('MedicacionAdministradaListener', () => {
  let listener;
  let facturacionServiceMock;

  beforeEach(async () => {
    facturacionServiceMock = {
      crearCargo: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        MedicacionAdministradaListener,
        {
          provide: FacturacionService,
          useValue: facturacionServiceMock,
        },
      ],
    }).compile();

    listener = module.get(
      MedicacionAdministradaListener,
    );
  });

  it('debe estar definido', () => {
    expect(listener).toBeDefined();
  });

  it('debe crear un cargo a partir del evento de medicacion', async () => {
    const evento = {
      administracionId: 15,
      pacienteId: 1,
      tipoCobertura: 'PREPAGA',
      montoBase: 5000,
    };

    facturacionServiceMock.crearCargo.mockResolvedValue({
      id: 20,
    });

    await listener.manejar(evento);

    expect(
      facturacionServiceMock.crearCargo,
    ).toHaveBeenCalledWith({
      pacienteId: 1,
      tipoCobertura: 'PREPAGA',
      concepto: 'Administración de medicación',
      montoBase: 5000,
      referenciaTipo: 'MEDICACION',
      referenciaId: 15,
    });
  });
});