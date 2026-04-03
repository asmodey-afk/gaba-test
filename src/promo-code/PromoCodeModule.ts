import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PromoCodeEntity} from './domain/entities/PromoCodeEntity';
import {ActivationEntity} from './domain/entities/ActivationEntity';
import {PromoCodeService} from './domain/services/PromoCodeService';
import {PromoCodeRepository} from './infrastructure/repositories/PromoCodeRepository';
import {ActivationRepository} from './infrastructure/repositories/ActivationRepository';
import {PromoCodeController} from './infrastructure/controllers/PromoCodeController';
import {IPromoCodeRepository} from './domain/interfaces/IPromoCodeRepository';
import {IActivationRepository} from './domain/interfaces/IActivationRepository';
import {IPromoCodeService} from './domain/interfaces/IPromoCodeService';
import {CreatePromoCodeUseCase} from './application/use-cases/CreatePromoCodeUseCase';
import {ActivatePromoCodeUseCase} from './application/use-cases/ActivatePromoCodeUseCase';

@Module({
    imports: [TypeOrmModule.forFeature([PromoCodeEntity, ActivationEntity])],
    controllers: [PromoCodeController],
    providers: [
        {
            provide: IPromoCodeService,
            useClass: PromoCodeService,
        },
        {
            provide: IPromoCodeRepository,
            useClass: PromoCodeRepository,
        },
        {
            provide: IActivationRepository,
            useClass: ActivationRepository,
        },
        CreatePromoCodeUseCase,
        ActivatePromoCodeUseCase,
    ],
})
export class PromoCodeModule {}