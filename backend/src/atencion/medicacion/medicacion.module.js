import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdministracionMedicacion } from './administracion-medicacion.entity';
import { MedicacionService } from './medicacion.service';
import { MedicacionController } from './medicacion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdministracionMedicacion,
    ]),
  ],
  providers: [MedicacionService],
  controllers: [MedicacionController],
})
export class MedicacionModule {}
  