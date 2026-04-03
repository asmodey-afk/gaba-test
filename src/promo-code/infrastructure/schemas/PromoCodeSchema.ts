import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class PromoCodeSchema {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    code: string;

    @Expose()
    @ApiProperty({description: 'Скидка в процентах'})
    discount: number;

    @Expose()
    @ApiProperty({description: 'Лимит активаций'})
    activationLimit: number;

    @Expose()
    @ApiProperty({description: 'Дата истечения'})
    expiresAt: Date;

    @Expose()
    @ApiProperty()
    createdAt: Date;
}