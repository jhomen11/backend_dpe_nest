import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropuestaDpeDocument = PropuestaDpe & Document;

@Schema({ collection: 'propuestadpes', versionKey: false })
export class PropuestaDpe {
  @Prop({ type: Number, index: true })
  rut: number;

  @Prop()
  dv: string;

  @Prop()
  nombre: string;

  @Prop()
  correlativo: number;

  @Prop()
  direccion: string;

  @Prop()
  region: string;

  @Prop()
  comuna: string;

  @Prop()
  motivo: string;

  @Prop({ type: [String] })
  meses: string[];

  @Prop()
  tsEnviado: string;

  @Prop()
  telefono: string;

  @Prop()
  email: string;

  @Prop()
  informado: string;

  @Prop({ index: true })
  estado: string;

  @Prop()
  fechaSolrevicion: Date;

  @Prop()
  fechaAceptacion: Date;

  @Prop()
  montoDevolucion: number;

  @Prop()
  folio: string;

  @Prop()
  tipoPago: string;

  @Prop({ index: true })
  periodoDevolucion: string;

  @Prop()
  banco: string;

  @Prop()
  tipoCuenta: string;

  @Prop()
  numeroCuenta: string;

  @Prop()
  rutaArchivo: string;

  @Prop()
  nombreArchivo: string;

  @Prop()
  fechaDeposito: Date;
}

export const PropuestaDpeSchema = SchemaFactory.createForClass(PropuestaDpe);
