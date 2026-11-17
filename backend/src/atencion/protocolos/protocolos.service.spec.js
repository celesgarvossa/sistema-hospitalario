import { Test } from '@nestjs/testing';

import { ProtocolosService } from './protocolos.service';

describe('ProtocolosService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProtocolosService,
      ],
    }).compile();

    service = module.get(ProtocolosService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe construir el protocolo preoperatorio', () => {
    const protocolo =
      service.obtenerPreoperatorio();

    expect(protocolo.nombre).toBe(
      'Protocolo Preoperatorio',
    );

    expect(protocolo.pasos).toEqual([
      'Verificar ayuno de 8 horas',
      'Colocar vía intravenosa periférica',
      'Realizar control de signos vitales cada 2 horas',
    ]);
  });

  it('debe construir el protocolo respiratorio', () => {
    const protocolo =
      service.obtenerRespiratorio();

    expect(protocolo.nombre).toBe(
      'Protocolo Respiratorio',
    );

    expect(protocolo.pasos).toEqual([
      'Monitoreo de saturación de oxígeno continuo',
      'Indicación de aislamiento de contacto y gotas',
    ]);
  });
});