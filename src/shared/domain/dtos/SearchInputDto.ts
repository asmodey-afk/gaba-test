import {ApiPropertyOptional} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsInt, IsOptional, Max, Min} from 'class-validator';

export class SearchInputDto {
    @ApiPropertyOptional({default: 1, description: 'Номер страницы'})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @ApiPropertyOptional({default: 20, description: 'Элементов на странице'})
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit: number = 20;
}