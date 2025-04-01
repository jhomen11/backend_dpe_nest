import { IsString, Length } from 'class-validator';

export class CreatePropuestaDpeDto {
  @IsString()
  @Length(6, 6, { message: 'El periodoDpe debe tener exactamente 6 caracteres.' })
  periodoDpe: string;
}