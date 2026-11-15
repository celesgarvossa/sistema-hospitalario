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
      'Verificar ayuno',
      'Controlar signos vitales',
      'Preparar al paciente',
      'Verificar documentación',
    ]);
  });

  it('debe construir el protocolo respiratorio', () => {
    const protocolo =
      service.obtenerRespiratorio();

    expect(protocolo.nombre).toBe(
      'Protocolo Respiratorio',
    );

    expect(protocolo.pasos).toEqual([
      'Controlar saturación de oxígeno',
      'Evaluar necesidad de oxigenoterapia',
      'Realizar nebulización si corresponde',
      'Controlar evolución del paciente',
    ]);
  });
});