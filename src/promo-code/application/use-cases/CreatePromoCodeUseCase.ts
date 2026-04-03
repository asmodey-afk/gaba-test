import {ConflictException, Inject, Injectable} from '@nestjs/common';
import {PromoCodeEntity} from '../../domain/entities/PromoCodeEntity';
import {IPromoCodeRepository} from '../../domain/interfaces/IPromoCodeRepository';
import {CreatePromoCodeDto} from '../../domain/dtos/CreatePromoCodeDto';

@Injectable()
export class CreatePromoCodeUseCase {
    constructor(
        @Inject(IPromoCodeRepository)
        private readonly promoCodeRepository: IPromoCodeRepository,
    ) {}

    async execute(dto: CreatePromoCodeDto): Promise<PromoCodeEntity> {
        const promoCode = await this.promoCodeRepository.createIfNotExists(dto);

        if (!promoCode) {
            throw new ConflictException(`Promo code "${dto.code}" already exists`);
        }

        return promoCode;
    }
}