import { Body, Controller, Get, Post } from '@nestjs/common';
import { NominaDpeService } from './nomina-dpe.service';
import { CreatePropuestaDpeDto } from 'src/modules/propuestas-dpe/dto/create-propuestaDpe.dto';

@Controller('nomina-dpe')
export class NominaDpeController {
    constructor(
        private readonly nominaDpeService: NominaDpeService,
    ) {}
    
    @Post('procesarNominaDpe')
    async procesarNominaDpe(@Body() createPropuestaDpeDto: CreatePropuestaDpeDto) {
        return this.nominaDpeService.procesarNominaDpe(createPropuestaDpeDto);
    }

}

