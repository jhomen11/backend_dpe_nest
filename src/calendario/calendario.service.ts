import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { Calendario } from './entities/calendario.entity';
import { NominaDpeService } from '../nomina-dpe/nomina-dpe.service';

@Injectable()
export class CalendarioService {
  constructor(
    @InjectModel(Calendario.name)
    private readonly calendarioModel: Model<Calendario>,
    private readonly NominaDpeService: NominaDpeService,
  ) {}

  async crearPeriodoDpe(createCalendarioDto: CreateCalendarioDto) {
    const calendarioDocs = await this.getCalendario();
    const ultimoPeriodoDpe: CreateCalendarioDto = calendarioDocs.map(doc => ({
      periodoDPE: doc.periodoDPE,
      fechaInicio: doc.fechaInicio,
      fechaCierre: doc.fechaCierre,
    }))[0]; // Assuming you want the first item
    return ultimoPeriodoDpe.periodoDPE;
  }

  async getCalendario() {
    return this.calendarioModel.find();
  }

}
