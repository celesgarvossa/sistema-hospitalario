import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cargo } from './cargo.entity';
import { FacturacionService } from './facturacion.service';
import { FacturacionController } from './facturacion.controller';
import { MedicacionAdministradaListener } from './medicacion-administrada.listener';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cargo,
    ]),
  ],
  controllers: [
    FacturacionController,
  ],
  providers: [
    FacturacionService,
    MedicacionAdministradaListener,
  ],
})
export class FacturacionModule {}