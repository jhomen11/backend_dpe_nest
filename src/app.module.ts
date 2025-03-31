import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NominaDpeModule } from './nomina-dpe/nomina-dpe.module';
import { PropuestasDpeModule } from './propuestas-dpe/propuestas-dpe.module';
import { CalendarioModule } from './calendario/calendario.module';

@Module({
  imports: [
    FilesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/dbdpe'),
    NominaDpeModule,
    PropuestasDpeModule,
    CalendarioModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
