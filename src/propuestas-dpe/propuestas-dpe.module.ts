import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropuestasDpeService } from './propuestas-dpe.service';
import { PropuestaDpe, PropuestaDpeSchema } from './entities/propuestaDpe.entity';
import { PropuestasDpeController } from './propuestas-dpe.controller';

@Module({
  providers: [PropuestasDpeService],
  imports: [
    MongooseModule.forFeature([
      { name: PropuestaDpe.name, schema: PropuestaDpeSchema },
    ]),
  ],
  controllers: [PropuestasDpeController],
})
export class PropuestasDpeModule {}
