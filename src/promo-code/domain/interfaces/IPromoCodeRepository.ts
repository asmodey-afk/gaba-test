import {PromoCodeEntity} from '../entities/PromoCodeEntity';
import {PromoCodeSearchInputDto} from '../dtos/PromoCodeSearchInputDto';

export const IPromoCodeRepository = Symbol('IPromoCodeRepository');

export type PromoCodeDetail = PromoCodeEntity & {activationCount: number};

export interface IPromoCodeRepository {
    create(data: Partial<PromoCodeEntity>): Promise<PromoCodeEntity>;
    createIfNotExists(data: Partial<PromoCodeEntity>): Promise<PromoCodeEntity | null>;
    findAll(dto: PromoCodeSearchInputDto): Promise<{total: number; items: PromoCodeEntity[]}>;
    findByIdWithActivationCount(id: number): Promise<PromoCodeDetail | null>;
    findByCodeWithLockAndActivationCount(code: string): Promise<PromoCodeDetail | null>;
    existsByCode(code: string): Promise<boolean>;
}