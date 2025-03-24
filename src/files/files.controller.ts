import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { NominaDpeService } from 'src/nomina-dpe/nomina-dpe.service';

@Controller('files')
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
        private readonly nominaDpeService: NominaDpeService,
    ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                
                return cb(null, "archivo.txt");
            }
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File,
    @Body('periodoDpe') periodoDpe: string,
) {
    try {
        const lineas = await this.filesService.leerArchivo();
        const lotes = await this.nominaDpeService.procesarDatos(lineas, periodoDpe);
  
        return {
          message: 'Archivo procesado y datos guardados exitosamente.',
          totalLotes: lotes.length,
        };
      } catch (error) {
        console.error('Error al procesar el archivo:', error);
        return {
          message: 'Error al procesar el archivo.',
          error: error.message,
        };
      }
        
    }
}
