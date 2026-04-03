import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ActivationEntity} from '../../domain/entities/ActivationEntity';
import {IActivationRepository} from '../../domain/interfaces/IActivationRepository';

@Injectable()
export class ActivationRepository implements IActivationRepository {
    constructor(
        @InjectRepository(ActivationEntity)
        private readonly dbRepository: Repository<ActivationEntity>,
    ) {}

    async existsByPromoCodeIdAndEmail(promoCodeId: number, email: string): Promise<boolean> {
        return this.dbRepository.existsBy({promoCodeId, email});
    }

    async create(data: Partial<ActivationEntity>): Promise<ActivationEntity> {
        return this.dbRepository.save(data);
    }
}
