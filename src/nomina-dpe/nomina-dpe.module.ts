import { Module } from '@nestjs/common';
import { NominaDpeService } from './nomina-dpe.service';
import { NominaDpe, NominaDpeSchema } from './entities/importDpe.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  exports: [NominaDpeService],
  providers: [NominaDpeService],
  imports: [
    MongooseModule.forFeature([
      { name: NominaDpe.name, schema: NominaDpeSchema },
    ]),
  ],
})
export class NominaDpeModule {}
