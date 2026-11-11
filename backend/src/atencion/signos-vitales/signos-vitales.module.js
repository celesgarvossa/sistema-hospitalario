import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { SignoVital } from './signo-vital.entity';
import { SignosVitalesService } from './signos-vitales.service';
import { SignosVitalesController } from './signos-vitales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SignoVital])],
  providers: [SignosVitalesService],
  controllers: [SignosVitalesController],
})
export class SignosVitalesModule {}