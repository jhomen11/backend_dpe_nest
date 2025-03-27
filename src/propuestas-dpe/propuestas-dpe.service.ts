import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropuestaDpe } from './entities/propuestaDpe.entity';

@Injectable()
export class PropuestasDpeService {
    constructor(
        @InjectModel(PropuestaDpe.name)
        private readonly propuestaDpeModel: Model<PropuestaDpe>,
    ) {}
}
