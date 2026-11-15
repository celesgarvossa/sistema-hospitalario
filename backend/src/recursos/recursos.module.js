import { Module } from '@nestjs/common';

import { InventarioModule } from './inventario/inventario.module';
import { CamasModule } from './camas/camas.module';

@Module({
  imports: [
    InventarioModule,
    CamasModule,
  ],
})
export class RecursosModule {}