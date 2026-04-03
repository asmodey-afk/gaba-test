import {ConflictException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {Transactional} from 'typeorm-transactional';
import {ActivationEntity} from '../../domain/entities/ActivationEntity';
import {IPromoCodeRepository} from '../../domain/interfaces/IPromoCodeRepository';
import {IActivationRepository} from '../../domain/interfaces/IActivationRepository';

@Injectable()
export class ActivatePromoCodeUseCase {
    constructor(
        @Inject(IPromoCodeRepository)
        private readonly promoCodeRepository: IPromoCodeRepository,
        @Inject(IActivationRepository)
        private readonly activationRepository: IActivationRepository,
    ) {}

    @Transactional()
    async execute(code: string, email: string): Promise<ActivationEntity> {
        const promoCode = await this.promoCodeRepository.findByCodeWithLockAndActivationCount(code.toUpperCase());

        if (!promoCode) {
            throw new NotFoundException(`Promo code "${code}" not found`);
        }

        if (new Date().getTime() > promoCode.expiresAt.getTime()) {
            throw new ConflictException(`Promo code "${code}" has expired`);
        }

        if (promoCode.activationCount >= promoCode.activationLimit) {
            throw new ConflictException(`Promo code "${code}" has reached its activation limit`);
        }

        const alreadyActivated = await this.activationRepository.existsByPromoCodeIdAndEmail(
            promoCode.id,
            email,
        );

        if (alreadyActivated) {
            throw new ConflictException(`Email "${email}" has already activated promo code "${code}"`);
        }

        return this.activationRepository.create({promoCodeId: promoCode.id, email});
    }
}