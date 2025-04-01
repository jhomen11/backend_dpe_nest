import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropuestaDpe } from './entities/propuestaDpe.entity';
import { FilterPropuestaDpeDto } from './dto/filter-propuesta-dpe.dto';

@Injectable()
export class PropuestasDpeService {
  constructor(
    @InjectModel(PropuestaDpe.name)
    private readonly propuestaDpeModel: Model<PropuestaDpe>,
  ) {}

  async listarPropuestasDpe(filterPropuestaDpeDto: FilterPropuestaDpeDto) {
    const { campo, valor, limit, page, periodo, fechaDesde, fechaHasta } = filterPropuestaDpeDto;

    console.log(campo, valor, limit, page, periodo, fechaDesde ?? "", fechaHasta ?? "");

    let propuestas: PropuestaDpe[] = [];

    const filtro: any = { periodoDevolucion: periodo };
    if (campo && valor) {
      filtro[campo] = valor;
    }

    if (fechaDesde || fechaHasta) {
      filtro.fechaAceptacion = {};
      if (fechaDesde) {
        filtro.fechaAceptacion.$gte = new Date(fechaDesde);
      }
      if (fechaHasta) {
        filtro.fechaAceptacion.$lte = new Date(fechaHasta);
      }
    }


    console.log(filtro);


    propuestas = await this.propuestaDpeModel
      .find(filtro)
      .limit(+limit)
      .skip(+limit * (page - 1));

    // Contar el total de documentos que coinciden con el filtro
    const totalDocs = await this.propuestaDpeModel.countDocuments(filtro);

    const totalPages = Math.ceil(totalDocs / +limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    const pagingCounter = totalDocs > 0 ? (page - 1) * +limit + 1 : 0;

    return {
      totalDocs,
      totalPages,
      limit: +limit,
      page: +page,
      prevPage,
      nextPage,
      pagingCounter,
      docs: propuestas,
    };
  }
}
