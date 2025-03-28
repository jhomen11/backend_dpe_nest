import { IsOptional, IsString, IsNumber, IsInt, Min, Length, ValidateIf } from 'class-validator';

export class FilterPropuestaDpeDto {
  @IsOptional()
  @IsString()
  campo?: string | null;

  @IsOptional()
  @ValidateIf((o) => typeof o.valor === 'string' || typeof o.valor === 'number')
  valor?: string | number | null;

  @IsString()
  limit: string;

  @IsInt()
  @Min(0)
  page: number;

  @IsString()
  @Length(6, 6, { message: 'El periodo debe tener exactamente 6 caracteres.' })
  periodo: string;
}