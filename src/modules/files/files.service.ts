import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import * as iconv from 'iconv-lite';
@Injectable()
export class FilesService {
  private readonly filePath = path.join(
    process.cwd(),
    'uploads',
    'archivo.txt',
  );

  private readonly titulos = [
    'rut',
    'dv',
    'tipoDevolucion',
    'periodo',
    'montoRemuneracion',
    'montoCotizacion',
    'topeRenta',
    'topeCotizacion',
    'montoDevAnterior',
    'montoDevProceso',
    'nombre',
    'apelPater',
    'apelMater',
    'region',
    'email',
    'telefono',
    'estado',
    'periodoDPE',
    'numCuenta',
    'nomBanco',
    'fechaDeposito',
  ];

  async leerArchivo(): Promise<string[][]> {
    try {
      if (!fs.existsSync(this.filePath)) {
        throw new Error('Archivo no encontrado');
      }

      const fileStream = fs
        .createReadStream(this.filePath)
        .pipe(iconv.decodeStream('latin1'));
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      let isFirstLine = true;
      const lineasProcesadas: string[][] = [];

      for await (const linea of rl) {
        const valores = linea.split('|').map((val) => val.trim());

        if (isFirstLine) {
          isFirstLine = false;
          continue;
        }

        lineasProcesadas.push(valores);
      }

      console.log(`✅ Archivo leído con ${lineasProcesadas.length} líneas procesadas.`);
      return lineasProcesadas;
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      throw error;
    }
  }
}
