import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Param,
    ParseIntPipe,
    Post,
    Query,
    SerializeOptions,
} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {IPromoCodeService} from '../../domain/interfaces/IPromoCodeService';
import {CreatePromoCodeUseCase} from '../../application/use-cases/CreatePromoCodeUseCase';
import {ActivatePromoCodeUseCase} from '../../application/use-cases/ActivatePromoCodeUseCase';
import {CreatePromoCodeDto} from '../../domain/dtos/CreatePromoCodeDto';
import {ActivatePromoCodeDto} from '../../domain/dtos/ActivatePromoCodeDto';
import {PromoCodeSearchInputDto} from '../../domain/dtos/PromoCodeSearchInputDto';
import {PromoCodeSchema} from '../schemas/PromoCodeSchema';
import {PromoCodeDetailSchema} from '../schemas/PromoCodeDetailSchema';
import {PromoCodeListSchema} from '../schemas/PromoCodeListSchema';
import {ActivationSchema} from '../schemas/ActivationSchema';

@ApiTags('Промокоды')
@Controller('promo-codes')
export class PromoCodeController {
    constructor(
        @Inject(IPromoCodeService)
        private readonly promoCodeService: IPromoCodeService,
        private readonly createPromoCodeUseCase: CreatePromoCodeUseCase,
        private readonly activatePromoCodeUseCase: ActivatePromoCodeUseCase,
    ) {}

    @ApiOperation({summary: 'Создать промокод'})
    @ApiCreatedResponse({type: PromoCodeSchema})
    @SerializeOptions({type: PromoCodeSchema, excludeExtraneousValues: true})
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body() dto: CreatePromoCodeDto,
    ) {
        return this.createPromoCodeUseCase.execute(dto);
    }

    @ApiOperation({summary: 'Получить список промокодов'})
    @ApiOkResponse({type: PromoCodeListSchema})
    @SerializeOptions({type: PromoCodeListSchema, excludeExtraneousValues: true})
    @Get()
    findAll(
        @Query() dto: PromoCodeSearchInputDto,
    ) {
        return this.promoCodeService.findAll(dto);
    }

    @ApiOperation({summary: 'Получить промокод по id'})
    @ApiOkResponse({type: PromoCodeDetailSchema})
    @SerializeOptions({type: PromoCodeDetailSchema, excludeExtraneousValues: true})
    @Get('/:id')
    findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.promoCodeService.findById(id);
    }

    @ApiOperation({summary: 'Активировать промокод по коду'})
    @ApiCreatedResponse({type: ActivationSchema})
    @SerializeOptions({type: ActivationSchema, excludeExtraneousValues: true})
    @Post('/:code/activate')
    @HttpCode(HttpStatus.CREATED)
    activate(
        @Param('code') code: string,
        @Body() dto: ActivatePromoCodeDto,
    ) {
        return this.activatePromoCodeUseCase.execute(code, dto.email);
    }
}