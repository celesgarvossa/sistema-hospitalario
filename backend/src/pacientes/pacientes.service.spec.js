import { Test } from '@nestjs/testing';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

describe('PacientesController', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PacientesController],
      providers: [PacientesService],
    }).compile();

    controller = module.get(PacientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});