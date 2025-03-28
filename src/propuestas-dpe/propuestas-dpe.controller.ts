import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PropuestasDpeService } from './propuestas-dpe.service';
import { FilterPropuestaDpeDto } from './dto/filter-propuesta-dpe.dto';

@Controller('propuestas-dpe')
export class PropuestasDpeController {
  constructor(private readonly propuestasDpeService: PropuestasDpeService) {}

  @Post('listarPropuestasDpe')
  @HttpCode(200)
  async listarPropuestasDpe(@Body() filterPropuestaDpeDto: FilterPropuestaDpeDto) {
    return this.propuestasDpeService.listarPropuestasDpe(filterPropuestaDpeDto);
  }
}
