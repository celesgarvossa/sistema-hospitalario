import { Module } from '@nestjs/common';

import { InventarioModule } from './inventario/inventario.module';

@Module({
  imports: [
    InventarioModule,
  ],
})
export class RecursosModule {}