import { IsString, IsDateString } from 'class-validator';

export class CreateCalendarioDto {
  @IsString()
  periodoDPE: string;

  @IsDateString()
  fechaInicio: Date;

  @IsDateString()
  fechaCierre: Date;
}