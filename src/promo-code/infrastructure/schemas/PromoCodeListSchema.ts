import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';
import {PromoCodeSchema} from './PromoCodeSchema';

export class PromoCodeListSchema {
    @Expose()
    @ApiProperty()
    total: number;

    @Expose()
    @Type(() => PromoCodeSchema)
    @ApiProperty({type: [PromoCodeSchema]})
    items: PromoCodeSchema[];
}