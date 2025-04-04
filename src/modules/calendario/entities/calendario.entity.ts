import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CalendarioDocument = Calendario & Document;
@Schema({ collection: 'calendarios', versionKey: false })
export class Calendario {

    @Prop({required: true, unique: true})
    periodoDPE: string;
    @Prop()
    fechaInicio: Date;
    @Prop()
    fechaCierre: Date;
}

export const CalendarioSchema = SchemaFactory.createForClass(Calendario);