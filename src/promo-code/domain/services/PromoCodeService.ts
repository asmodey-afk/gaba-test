import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {PromoCodeEntity} from '../entities/PromoCodeEntity';
import {IPromoCodeRepository, PromoCodeDetail} from '../interfaces/IPromoCodeRepository';
import {IPromoCodeService} from '../interfaces/IPromoCodeService';
import {PromoCodeSearchInputDto} from '../dtos/PromoCodeSearchInputDto';

@Injectable()
export class PromoCodeService implements IPromoCodeService {
    constructor(
        @Inject(IPromoCodeRepository)
        private readonly promoCodeRepository: IPromoCodeRepository,
    ) {}

    findAll(dto: PromoCodeSearchInputDto): Promise<{total: number; items: PromoCodeEntity[]}> {
        return this.promoCodeRepository.findAll(dto);
    }

    async findById(id: number): Promise<PromoCodeDetail> {
        const promoCode = await this.promoCodeRepository.findByIdWithActivationCount(id);

        if (!promoCode) {
            throw new NotFoundException(`Promo code with id "${id}" not found`);
        }

        return promoCode;
    }
}