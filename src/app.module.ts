import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from './modules/files/files.module';
import { NominaDpeModule } from './modules/nomina-dpe/nomina-dpe.module';
import { PropuestasDpeModule } from './modules/propuestas-dpe/propuestas-dpe.module';
import { CalendarioModule } from './modules/calendario/calendario.module';

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
