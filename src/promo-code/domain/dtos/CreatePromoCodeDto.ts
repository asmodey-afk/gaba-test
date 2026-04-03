import {ApiProperty} from '@nestjs/swagger';
import {IsDate, IsInt, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {Transform} from 'class-transformer';

export class CreatePromoCodeDto {
    @ApiProperty({example: 'SAVE20', description: 'Unique promo code string'})
    @Transform(({value}) => value?.toUpperCase())
    @IsString()
    @MinLength(1)
    @MaxLength(64)
    code: string;

    @ApiProperty({example: 20, description: 'Discount percentage (1–100)'})
    @IsInt()
    @Min(1)
    @Max(100)
    discount: number;

    @ApiProperty({example: 100, description: 'Maximum number of activations'})
    @IsInt()
    @Min(1)
    activationLimit: number;

    @ApiProperty({example: '2026-12-31T23:59:59.000Z', description: 'Expiry date (ISO 8601)'})
    @Transform(({value}) => new Date(value))
    @IsDate()
    expiresAt: Date;
}
