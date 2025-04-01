import {
  IsString,
  IsDate,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Type } from 'class-transformer';

// Validador personalizado
@ValidatorConstraint({ name: 'IsFechaCierrePosterior', async: false })
export class IsFechaCierrePosterior implements ValidatorConstraintInterface {
  validate(fechaCierre: Date, args: ValidationArguments): boolean {
    const dto = args.object as CreateCalendarioDto;
    return fechaCierre > dto.fechaInicio;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'La fecha de cierre debe ser posterior a la fecha de inicio';
  }
}
export class CreateCalendarioDto {
  @IsString()
  periodoDPE: string;

  @Type(() => Date)
  @IsDate()
  fechaInicio: Date;

  @Type(() => Date)
  @IsDate()
  @Validate(IsFechaCierrePosterior)
  fechaCierre: Date;
}
