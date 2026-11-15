import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cama } from './cama.entity';
import { CamasService } from './camas.service';
import { CamasController } from './camas.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cama,
    ]),
  ],
  controllers: [
    CamasController,
  ],
  providers: [
    CamasService,
  ],
})
export class CamasModule {}