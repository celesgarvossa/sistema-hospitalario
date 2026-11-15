import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdministracionMedicacion } from './administracion-medicacion.entity';
import { MedicacionService } from './medicacion.service';
import { MedicacionController } from './medicacion.controller';
import { Medicamento } from '../../recursos/inventario/medicamento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdministracionMedicacion,
      Medicamento, ]),
    ],

  providers: [MedicacionService],
  controllers: [MedicacionController],
})

export class MedicacionModule {}
  