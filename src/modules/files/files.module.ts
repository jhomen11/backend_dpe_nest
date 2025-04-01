import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { NominaDpeModule } from 'src/modules/nomina-dpe/nomina-dpe.module';

@Module({
  imports: [NominaDpeModule],
  providers: [FilesService],
  controllers: [FilesController]
})
export class FilesModule {}
