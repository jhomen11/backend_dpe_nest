import { Module } from '@nestjs/common';
import { NominaDpeService } from './nomina-dpe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportDpe, ImportDpeSchema } from './entities/importDpe.entity';
import { NominaDpeController } from './nomina-dpe.controller';
import { PropuestaDpe, PropuestaDpeSchema } from 'src/propuestas-dpe/entities/propuestaDpe.entity';

@Module({
  exports: [NominaDpeService, MongooseModule],
  providers: [NominaDpeService],
  imports: [
    MongooseModule.forFeature([
      { name: ImportDpe.name, schema: ImportDpeSchema },
      { name: PropuestaDpe.name, schema: PropuestaDpeSchema },
    ]),

  ],
  controllers: [NominaDpeController],
})
export class NominaDpeModule {}
