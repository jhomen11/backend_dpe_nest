import { Module } from '@nestjs/common';
import { NominaDpeService } from './nomina-dpe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportDpe, ImportDpeSchema } from './entities/importDpe.entity';
import { NominaDpeController } from './nomina-dpe.controller';

@Module({
  exports: [NominaDpeService, MongooseModule],
  providers: [NominaDpeService],
  imports: [
    MongooseModule.forFeature([
      { name: ImportDpe.name, schema: ImportDpeSchema },
    ]),
  ],
  controllers: [NominaDpeController],
})
export class NominaDpeModule {}
