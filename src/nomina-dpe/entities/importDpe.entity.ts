// filepath: c:\Users\Apiux\Documents\dev\backend_dpe_nest\src\nomina-dpe\entities\importDpe.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NominaDpe extends Document {
  @Prop({ required: true, index: true })
  rut: string;

  @Prop()
  dv: string;

  @Prop()
  tipoDevolucion: string;

  @Prop()
  periodo: string;

  @Prop()
  montoRemuneracion: string;

  @Prop()
  montoCotizacion: string;

  @Prop()
  topeRenta: string;

  @Prop()
  topeCotizacion: string;

  @Prop()
  montoDevAnterior: string;

  @Prop()
  montoDevProceso: string;

  @Prop()
  nombre: string;

  @Prop()
  apelPater: string;

  @Prop()
  apelMater: string;

  @Prop()
  region: string;

  @Prop()
  email: string;

  @Prop()
  telefono: string;

  @Prop({ index: true })
  estado: string;

  @Prop({ index: true })
  periodoDPE: string;

  @Prop()
  numCuenta: string;

  @Prop()
  nomBanco: string;

  @Prop({ index: true })
  fechaDeposito: Date;
}

export const NominaDpeSchema = SchemaFactory.createForClass(NominaDpe);