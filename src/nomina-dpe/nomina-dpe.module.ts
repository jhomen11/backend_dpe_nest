import { Module } from '@nestjs/common';
import { NominaDpeService } from './nomina-dpe.service';

@Module({
  exports: [NominaDpeService],
  providers: [NominaDpeService]
})
export class NominaDpeModule {}
