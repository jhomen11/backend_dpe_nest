import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CalendarioService } from './calendario.service';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';

@Controller('calendario')
export class CalendarioController {
  constructor(private readonly calendarioService: CalendarioService) {}

  @Post('crearPeriodoDpe')
  create(@Body() createCalendarioDto: CreateCalendarioDto) {
    return this.calendarioService.crearPeriodoDpe(createCalendarioDto);
  }

  @Get('getNuevoPeriodoDpe')
  getNuevoPeriodoDpe() {
    return this.calendarioService.getNuevoPeriodoDpe();
  }

  @Get('getCalendario')
  async getCalendario() {
    return await this.calendarioService.getCalendario();
  }
}
