import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NominaDpe extends Document {
  @Prop() rut: string;
  @Prop() dv: string;
  @Prop() tipoDevolucion: string;
  @Prop() periodo: string;
  @Prop() montoRemuneracion: string;
  @Prop() montoCotizacion: string;
  @Prop() topeRenta: string;
  @Prop() topeCotizacion: string;
  @Prop() montoDevAnterior: string;
  @Prop() montoDevProceso: string;
  @Prop() nombre: string;
  @Prop() apelPater: string;
  @Prop() apelMater: string;
  @Prop() region: string;
  @Prop() email: string;
  @Prop() telefono: string;
  @Prop() estado: string;
  @Prop() periodoDpe: string;
  @Prop() numCuenta: string;
  @Prop() nomBanco: string;
  @Prop() fechaDeposito: Date;
}

export const NominaDpeSchema = SchemaFactory.createForClass(NominaDpe);