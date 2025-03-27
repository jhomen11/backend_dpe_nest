import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImportDpeDocument = ImportDpe & Document;

@Schema({ collection: 'importdpe', versionKey: false })
export class ImportDpe {
  @Prop({ index: true }) rut: string;
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
  @Prop({index: true}) estado: string;
  @Prop() periodoDPE: string;
  @Prop() numCuenta: string;
  @Prop() nomBanco: string;
  @Prop() fechaDeposito: Date;
}

export const ImportDpeSchema = SchemaFactory.createForClass(ImportDpe);
