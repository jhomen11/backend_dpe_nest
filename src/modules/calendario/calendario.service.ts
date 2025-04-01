import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { Calendario } from './entities/calendario.entity';
import { NominaDpeService } from '../modules/nomina-dpe/nomina-dpe.service';

@Injectable()
export class CalendarioService {
  constructor(
    @InjectModel(Calendario.name)
    private readonly calendarioModel: Model<Calendario>,
    private readonly NominaDpeService: NominaDpeService,
  ) {}

  async crearPeriodoDpe(createCalendarioDto: CreateCalendarioDto) {

    try {
      const nuevoCalendario = await this.calendarioModel.create(createCalendarioDto);
      return nuevoCalendario;
      
    } catch (error) {
      if (error.code === 11000) {
        console.log('El periodo ya existe en la base de datos.');
        throw new BadRequestException('El periodo ya existe en la base de datos.');
      }
    }
  }

  // * Método para obtener el nuevo periodoDPE
  async getNuevoPeriodoDpe() {
    const datos = await this.calendarioModel.find({});

    const datosValidos = datos.filter(
      (item) => item && Object.keys(item).length > 0,
    );

    let maxYear = '';
    let mesMaxAño = '';

    for (const item of datosValidos) {
      const mes = item.periodoDPE.slice(0, 2);
      const año = item.periodoDPE.slice(2);

      if (
        maxYear === '' ||
        parseInt(año) > parseInt(maxYear) ||
        (parseInt(año) === parseInt(maxYear) &&
          parseInt(mes) > parseInt(mesMaxAño))
      ) {
        maxYear = año;
        mesMaxAño = mes;
      }
    }
    // Determinar el próximo periodo
    let nuevoMes = '';
    let nuevoAño = parseInt(maxYear);

    if (mesMaxAño === '03') {
      nuevoMes = '09';
    } else if (mesMaxAño === '09') {
      nuevoMes = '03';
      nuevoAño += 1;
    }
    const proximoPeriodo = `${nuevoMes}${nuevoAño}`;
    console.log('✅ Próximo periodo:', proximoPeriodo);

    return proximoPeriodo;
  }

  async getCalendario() {
    const datos = await this.calendarioModel.find({});
    const datosValidos = datos.filter(
      (item) => item && Object.keys(item).length > 0,
    );

    let maxYear = '';
    let mesMaxAño = '';

    for (const item of datosValidos) {
      const mes = item.periodoDPE.slice(0, 2);
      const año = item.periodoDPE.slice(2);

      if (
        maxYear === '' ||
        parseInt(año) > parseInt(maxYear) ||
        (parseInt(año) === parseInt(maxYear) &&
          parseInt(mes) > parseInt(mesMaxAño))
      ) {
        maxYear = año;
        mesMaxAño = mes;
      }
    }
    const fechaFiltro = `${mesMaxAño}${maxYear}`;
    console.log('✅ Fecha filtro:', fechaFiltro);
    const calendario = datosValidos.filter(
      (item) => item.periodoDPE === fechaFiltro,
    );

    return calendario;
  }
}
