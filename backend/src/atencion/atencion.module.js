import { Module } from '@nestjs/common';

import { SignosVitalesModule } from './signos-vitales/signos-vitales.module';

@Module({
  imports: [
    SignosVitalesModule,
  ],
})
export class AtencionModule {}