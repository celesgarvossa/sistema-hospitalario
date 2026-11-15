import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Medicamento } from './medicamento.entity';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Medicamento,
    ]),
  ],
  providers: [InventarioService],
  controllers: [InventarioController],
})
export class InventarioModule {}
