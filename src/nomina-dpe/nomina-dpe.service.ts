import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ImportDpe } from './entities/importDpe.entity';
import { Model } from 'mongoose';
import { PropuestaDpe } from 'src/propuestas-dpe/entities/propuestaDpe.entity';
import { CreatePropuestaDpeDto } from 'src/propuestas-dpe/dto/create-propuestaDpe.dto';

@Injectable()
export class NominaDpeService {
  constructor(
    @InjectModel(ImportDpe.name)
    private readonly importDpeModel: Model<ImportDpe>,
    @InjectModel(PropuestaDpe.name)
    private readonly propuestaDpeModel: Model<PropuestaDpe>,
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
    console.log(datos);
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
    console.log('✅ Periodo dpe:', `${mesMaxAño}${maxYear}`);
    return { periodoDPE: `${mesMaxAño}${maxYear}` };
  }


  // * Método para procesar la nómina
  async procesarNominaDpe(CreatePropuestaDpeDto: CreatePropuestaDpeDto) {
    
    console.log(CreatePropuestaDpeDto);
    const { periodoDpe } = CreatePropuestaDpeDto;

    const BATCH_SIZE = 5000;
    let batch: any[] = [];

    console.log('⏳ Eliminando datos previos...');
    await this.propuestaDpeModel.deleteMany({ periodoDevolucion: periodoDpe });
    console.log('✅ Datos anteriores eliminados.');

    const nominaDpe = await this.importDpeModel
      .aggregate([
        { $match: { periodoDPE: periodoDpe } },
        {
          $group: {
            _id: {
              rut: '$rut',
              dv: '$dv',
              nombre: '$nombre',
              apelPater: '$apelPater',
              apelMater: '$apelMater',
              estado: '$estado',
              periodoDevolucion: '$periodoDPE',
              banco: '$nomBanco',
              numeroCuenta: '$numCuenta',
              fechaDeposito: '$fechaDeposito',
            },
          },
        },
      ]);

      console.log(`${nominaDpe.length} registros obtenidos.`);
    // console.log(nominaDpe);
    const listado = nominaDpe.map((x) => {
      const nombreCompleto =
        x._id.rut < 65000000
          ? `${x._id.nombre} ${x._id.apelPater} ${x._id.apelMater}`
          : x._id.nombre;

      return {
        rut: x._id.rut,
        dv: x._id.dv,
        nombre: nombreCompleto,
        correlativo: '1',
        direccion: '',
        region: '',
        comuna: '',
        meses: null,
        telefono: '',
        email: '',
        estado: x._id.estado,
        fechaSolrevicion: null,
        fechaAceptacion: null,
        montoDevolucion: null,
        folio: '',
        tipoPago: '',
        periodoDevolucion: x._id.periodoDevolucion,
        banco: x._id.banco,
        tipoCuenta: '',
        numeroCuenta: x._id.numeroCuenta,
        rutaArchivo: '',
        nombreArchivo: '',
        fechaDeposito: x._id.fechaDeposito,
      };
    });

    console.log('⏳ Consultando registros existentes...');
    const existentes = await this.propuestaDpeModel.find(
        { periodoDevolucion: periodoDpe },
        { rut: 1, _id: 0 }
    );

    const setExistentes = new Set(existentes.map(e => e.rut));
    console.log(`✅ ${setExistentes.size} registros ya existen.`);

    for (const item of listado) {
      if (!setExistentes.has(item.rut)) {
          batch.push(item);
      }

      if (batch.length >= BATCH_SIZE) {
          await this.propuestaDpeModel.insertMany(batch);
          batch = [];
      }
  }

  if (batch.length > 0) {
      await this.propuestaDpeModel.insertMany(batch);
  }

  console.log('✅ Proceso finalizado.');
   
    return { msg: `Recibido periodoDpe: ${periodoDpe}` };
  }
}
