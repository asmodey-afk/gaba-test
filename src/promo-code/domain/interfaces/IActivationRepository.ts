import {ActivationEntity} from '../entities/ActivationEntity';

export const IActivationRepository = Symbol('IActivationRepository');

export interface IActivationRepository {
    existsByPromoCodeIdAndEmail(promoCodeId: number, email: string): Promise<boolean>;
    create(data: Partial<ActivationEntity>): Promise<ActivationEntity>;
}