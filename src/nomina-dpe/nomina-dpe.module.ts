import { Module } from '@nestjs/common';
import { NominaDpeService } from './nomina-dpe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportDpe, ImportDpeSchema } from './entities/importDpe.entity';

@Module({
  exports: [NominaDpeService],
  providers: [NominaDpeService],
  imports: [
    MongooseModule.forFeature([
      { name: ImportDpe.name, schema: ImportDpeSchema },
    ]),
  ],
})
export class NominaDpeModule {}
