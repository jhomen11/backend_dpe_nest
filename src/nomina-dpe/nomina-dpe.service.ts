import { Injectable } from '@nestjs/common';

@Injectable()
export class NominaDpeService {
  async procesarDatos(lineas: string[][], periodoDpe: string) {
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
        estado: valores[18] !== '' ? 4 : 1,
        periodoDPE: periodoDpe,
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
    return lotes;
  }
}
