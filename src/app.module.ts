import { Module } from '@nestjs/common';
import { FilesModule } from './files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NominaDpeModule } from './nomina-dpe/nomina-dpe.module';

@Module({
  imports: [
    FilesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/dpe'),
    NominaDpeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
