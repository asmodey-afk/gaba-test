import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsOptional, IsString, MaxLength} from 'class-validator';
import {SearchInputDto} from '../../../shared/domain/dtos/SearchInputDto';

export class PromoCodeSearchInputDto extends SearchInputDto {
    @ApiPropertyOptional({description: 'Поиск по коду промокода'})
    @IsOptional()
    @IsString()
    @MaxLength(64)
    query?: string;
}