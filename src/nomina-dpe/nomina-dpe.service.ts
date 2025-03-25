import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NominaDpe } from './entities/importDpe.entity';
import { Model } from 'mongoose';

@Injectable()
export class NominaDpeService {
  constructor(
    @InjectModel(NominaDpe.name)
    private readonly nominaDpeModel: Model<NominaDpe>,
  ) {}

  async procesarDatos(lineas: string[][], periodoDpe: string) {
    console.log(periodoDpe);
    const lotes: any[] = [];
    let datosProcesados: any[] = [];
    let contador = 0;

    for (const valores of lineas) {
      const fechaDepositoRaw = valores[18] || '';
      let fechaDeposito: Date | null = null;

      if (fechaDepositoRaw) {
        const [day, month, year] = fechaDepositoRaw.split('-').map(Number);
        if (day && month && year) {
          fechaDeposito = new Date(year, month - 1, day);
        }
      }

      const objeto: any = {
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
        periodoDpe: periodoDpe,
        numCuenta: valores[16] || '',
        nomBanco: valores[17] || '',
        fechaDeposito: fechaDeposito,
      };

      datosProcesados.push(objeto);
      contador++;

      
      if (contador >= 5000) {
          lotes.push([...datosProcesados]);
          datosProcesados = [];
          contador = 0;
        }
      }
      
      if (datosProcesados.length > 0) {
          lotes.push([...datosProcesados]);
        }

    console.log(
      `✅ Datos procesados en ${lotes.length} lotes de 5,000 registros.`,
    );

    try {
      console.log('⏳ Procesando lotes...');
      
      // Eliminar datos anteriores
      await this.nominaDpeModel.deleteMany({ periodoDpe: periodoDpe });
      console.log('✅ Datos anteriores eliminados correctamente.');
    
      // Insertar lotes
      await Promise.all(lotes.map(lote => this.nominaDpeModel.insertMany(lote)));
      console.log('✅ Todos los lotes han sido guardados correctamente en la base de datos.');
      return {msg: 'Datos guardados correctamente'};
      
    } catch (error) {
      console.error('❌ Ocurrió un error durante el procesamiento de los datos:', error);
      throw new Error('Error al procesar los datos.');
    }

  }

  // async guardarDatos(lotes: any[], periodoDpe: string) {

  //   await this.nominaDpeModel.deleteMany({ periodoDPE: periodoDpe }); // Elimina los datos anteriores

  //   this.nominaDpeModel.insertMany(lotes); // Inserta los datos en MongoDB

  //   console.log('✅ Todos los lotes han sido guardados en la base de datos.');

  //   // for (const lote of lotes) {
  //   //   try {
  //   //     await this.nominaDpeModel.insertMany(lote); // Inserta los datos en MongoDB
  //   //     console.log(`✅ Lote de ${lote.length} registros guardado exitosamente.`);
  //   //   } catch (error) {
  //   //     console.error('❌ Error al guardar un lote:', error);
  //   //     throw new Error('Error al guardar los datos en la base de datos.');
  //   //   }
  //   // }
  // }
}
