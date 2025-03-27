import { Body, Controller, Get, Post } from '@nestjs/common';
import { NominaDpeService } from './nomina-dpe.service';

@Controller('nomina-dpe')
export class NominaDpeController {
    constructor(
        private readonly nominaDpeService: NominaDpeService,
    ) {}


    @Get('getPeriodoDpe')
    async getPeriodoDpe() {
        return this.nominaDpeService.getPeriodoDpe();
    }
    
    @Post('procesarNominaDpe')
    async procesarNominaDpe(@Body('periodoDpe') periodoDpe: string) {
        return this.nominaDpeService.procesarNominaDpe(periodoDpe);
    }

}

