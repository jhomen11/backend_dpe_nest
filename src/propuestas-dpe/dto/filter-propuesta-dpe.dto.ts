import { IsOptional, IsString, IsNumber, IsInt, Min, Length } from 'class-validator';

export class FilterPropuestaDpeDto {
  @IsOptional()
  @IsString()
  campo?: string | null;

  @IsOptional()
  @IsString()
  valor?: string | null;

  @IsString()
  limit: string;

  @IsInt()
  @Min(0)
  page: number;

  @IsString()
  @Length(6, 6, { message: 'El periodo debe tener exactamente 6 caracteres.' })
  periodo: string;
}