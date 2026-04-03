import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';

export class ActivationSchema {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    promoCodeId: number;

    @Expose()
    @ApiProperty()
    email: string;

    @Expose()
    @ApiProperty()
    activatedAt: Date;
}