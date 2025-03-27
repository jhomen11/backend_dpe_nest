import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImportDpe } from './entities/importDpe.entity';
import { Model } from 'mongoose';

@Injectable()
export class NominaDpeService {
  constructor(
    @InjectModel(ImportDpe.name)
    private readonly importDpeModel: Model<ImportDpe>,
  ) {}

  async procesarDatos(lineas: string[][], periodoDpe: string) {
    console.log(periodoDpe);

    //* Tamaño de los lotes a insertar
    const BATCH_SIZE = 5000;
    let batch: any[] = [];

    console.log('⏳ Eliminando datos previos...');
    await this.importDpeModel.deleteMany({ periodoDPE: periodoDpe }); // Eliminar datos anteriores
    console.log('✅ Datos anteriores eliminados.');

    for (const valores of lineas) {
      const fechaDepositoRaw = valores[18] || '';
      let fechaDeposito: Date | null = null;

      if (fechaDepositoRaw) {
        const [day, month, year] = fechaDepositoRaw.split('-').map(Number);
        if (day && month && year) {
          fechaDeposito = new Date(year, month - 1, day);
        }
      }

      let objeto: any = {
        rut: valores[0] || '',
        dv: valores[1] || '',
        tipoDevolucion: valores[2] || '',
        periodo: valores[3] || '',
        montoRemuneracion: valores[4] || '',
        montoCotizacion: valores[5] || '',
        topeRenta: valores[6] || '',
        topeCotizacion: valores[7] || '',
        montoDevAnterior: valores[8] || '',
        montoDevProceso: valores[9] || '',
        nombre: valores[10] || '',
        apelPater: valores[11] || '',
        apelMater: valores[12] || '',
        region: valores[13] || '',
        email: valores[14] || '',
        telefono: valores[15] || '',
        estado: valores[18] !== '' ? '4' : '1',
        periodoDPE: periodoDpe,
        numCuenta: valores[16] || '',
        nomBanco: valores[17] || '',
        fechaDeposito: fechaDeposito || '',
      };

      objeto = Object.fromEntries(
        Object.entries(objeto).filter(([_, v]) => v !== '' && v !== null),
      );

      batch.push(objeto);

      // 📌 Insertar lote cuando alcanza el tamaño BATCH_SIZE
      if (batch.length >= BATCH_SIZE) {
        await this.importDpeModel.insertMany(batch);
        // console.log(`✅ ${batch.length} registros insertados.`);
        batch = []; // 🔥 Limpiar memoria
      }
    }

    // 📌 Insertar los últimos registros que quedaron en batch
    if (batch.length > 0) {
      await this.importDpeModel.insertMany(batch);
      console.log(`✅ Últimos ${batch.length} registros insertados.`);
    }

    console.log('✅ Todos los datos han sido guardados.');
    return { msg: 'Datos guardados correctamente' };
  }

  // * Método para obtener el periodoDPE
  async getPeriodoDpe() {
    console.log('⏳ Ejecutando getPeriodoDpe...');
    const datos = await this.importDpeModel.find().distinct('periodoDPE');
    let maxYear = '';
    let mesMaxAño = '';
    for (const item of datos) {
      const mes = item.slice(0, 2);
      const año = item.slice(2);

      if (maxYear === '' || parseInt(año) > parseInt(maxYear)) {
        maxYear = año; 
        mesMaxAño = mes;
      }
    }
    console.log('Datos obtenidos:', `${mesMaxAño}${maxYear}`);
    return `${mesMaxAño}${maxYear}`;
  }

  // * Método para procesar la nómina
  async procesarNominaDpe(periodoDpe: string) {
    return { msg: `Recibido periodoDpe: ${periodoDpe}` };
  }
}
