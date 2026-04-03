import {PromoCodeEntity} from '../entities/PromoCodeEntity';
import {PromoCodeDetail} from './IPromoCodeRepository';
import {PromoCodeSearchInputDto} from '../dtos/PromoCodeSearchInputDto';

export const IPromoCodeService = Symbol('IPromoCodeService');

export interface IPromoCodeService {
    findAll(dto: PromoCodeSearchInputDto): Promise<{total: number; items: PromoCodeEntity[]}>;
    findById(id: number): Promise<PromoCodeDetail>;
}