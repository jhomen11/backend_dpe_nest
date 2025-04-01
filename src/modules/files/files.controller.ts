import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { NominaDpeService } from 'src/modules/nomina-dpe/nomina-dpe.service';
import { CreateNominaDpeDto } from 'src/modules/nomina-dpe/dto/create-nominaDpe.dto';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly nominaDpeService: NominaDpeService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          return cb(null, 'archivo.txt');
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNominaDpeDto: CreateNominaDpeDto,
  ) {
    const { periodoDpe } = createNominaDpeDto; // Extrae el valor validado
    console.log('Periodo DPE:', periodoDpe);
    try {
      const lineas = await this.filesService.leerArchivo();
      const resp = await this.nominaDpeService.procesarDatos(
        lineas,
        periodoDpe,
      );
      

      return resp;
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      return {
        message: 'Error al procesar el archivo.',
        error: error.message,
      };
    }
  }
}
