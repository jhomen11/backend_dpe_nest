import { Module } from '@nestjs/common';
import { CalendarioService } from './calendario.service';
import { CalendarioController } from './calendario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendario, CalendarioSchema } from './entities/calendario.entity';
import { NominaDpeModule } from 'src/nomina-dpe/nomina-dpe.module';

@Module({
  providers: [CalendarioService],
  imports: [
    NominaDpeModule,
    MongooseModule.forFeature([
      { name: Calendario.name, schema: CalendarioSchema },
    ]),
  ],
  controllers: [CalendarioController],
})
export class CalendarioModule {}
