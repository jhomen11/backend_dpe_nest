import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { Calendario } from './entities/calendario.entity';

@Injectable()
export class CalendarioService {
  constructor(
    @InjectModel(Calendario.name)
    private readonly calendarioModel: Model<Calendario>,
  ) {}

  async crearPeriodoDpe(createCalendarioDto: CreateCalendarioDto) {
    const { periodoDPE } = createCalendarioDto;
    const periodoactual = await this.calendarioModel.findOne({
      periodoDPE,
    });
    console.log('✅', periodoactual?.fechaCierre);

    try {
      const nuevoPeriodoDpe =
        await this.calendarioModel.create(createCalendarioDto);
      return nuevoPeriodoDpe;
    } catch (error) {
      if (error.code === 11000) {
        console.log('El periodo ya existe en la base de datos.');
        throw new BadRequestException(
          'El periodo ingresado ya se encuentra creado.',
        );
      }
    }
  }

  // * Método para obtener el nuevo periodoDPE
  async getNuevoPeriodoDpe() {
    const datos = await this.calendarioModel.find({});
    const calendarioOrdenado = this.ordenarCalendario(datos);
    const fechaActual = new Date();

    const ultimoPeriodo = await this.calendarioModel
      .findOne({})
      .sort({ fechaCierre: -1 }) // Ordenar por fechaCierre descendente
      .exec();

    // console.log('✅ Último periodo:', ultimoPeriodo);

    // console.log(ultimoPeriodo && ultimoPeriodo?.fechaCierre > fechaActual);

    if (ultimoPeriodo && ultimoPeriodo?.fechaCierre > fechaActual) {
      return ultimoPeriodo.periodoDPE;
    }

    const { maxYear, mesMaxAño } = calendarioOrdenado;
    console.log('✅ Datos:', datos);

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

  // * Método para obtener el calendario
  async getCalendario() {
    const datos = await this.calendarioModel.find({});
    const calendarioOrdenado = this.ordenarCalendario(datos);

    const { maxYear, mesMaxAño, datosValidos } = calendarioOrdenado;

    const fechaFiltro = `${mesMaxAño}${maxYear}`;
    console.log('✅ Fecha filtro:', fechaFiltro);
    const calendario = datosValidos.filter(
      (item) => item.periodoDPE === fechaFiltro,
    );

    return calendario;
  }

  private ordenarCalendario(calendario: Calendario[]) {
    let maxYear = '';
    let mesMaxAño = '';

    const datosValidos = calendario.filter(
      (item) => item && Object.keys(item).length > 0,
    );

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
    return { maxYear, mesMaxAño, datosValidos };
  }
}
