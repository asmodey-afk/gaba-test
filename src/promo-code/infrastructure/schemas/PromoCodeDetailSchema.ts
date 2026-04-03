import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {PromoCodeSchema} from './PromoCodeSchema';

export class PromoCodeDetailSchema extends PromoCodeSchema {
    @Expose()
    @ApiProperty({description: 'Количество активаций'})
    activationCount: number;
}