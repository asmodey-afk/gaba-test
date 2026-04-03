import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import {PromoCodeEntity} from '../../domain/entities/PromoCodeEntity';
import {ActivationEntity} from '../../domain/entities/ActivationEntity';
import {IPromoCodeRepository, PromoCodeDetail} from '../../domain/interfaces/IPromoCodeRepository';
import {PromoCodeSearchInputDto} from '../../domain/dtos/PromoCodeSearchInputDto';

@Injectable()
export class PromoCodeRepository implements IPromoCodeRepository {
    constructor(
        @InjectRepository(PromoCodeEntity)
        private readonly dbRepository: Repository<PromoCodeEntity>,
    ) {
    }

    create(data: Partial<PromoCodeEntity>): Promise<PromoCodeEntity> {
        return this.dbRepository.save(data);
    }

    async createIfNotExists(data: Partial<PromoCodeEntity>): Promise<PromoCodeEntity | null> {
        const result = await this.dbRepository
            .createQueryBuilder()
            .insert()
            .values(data as DeepPartial<PromoCodeEntity>)
            .orIgnore()
            .execute();

        if (!result.raw.length) {
            return null;
        }

        return Object.assign(
            this.dbRepository.create(data as DeepPartial<PromoCodeEntity>),
            result.generatedMaps[0],
        );
    }

    async findAll(dto: PromoCodeSearchInputDto): Promise<{total: number; items: PromoCodeEntity[]}> {
        const qb = this.dbRepository
            .createQueryBuilder('pc')
            .orderBy('pc.created_at', 'DESC')
            .skip((dto.page - 1) * dto.limit)
            .take(dto.limit);

        if (dto.query) {
            qb.where('pc.code ILIKE :query', {query: `%${dto.query}%`});
        }

        const [items, total] = await qb.getManyAndCount();

        return {total, items};
    }

    async findByIdWithActivationCount(id: number): Promise<PromoCodeDetail | null> {
        const {entities, raw} = await this.dbRepository
            .createQueryBuilder('pc')
            .leftJoin('pc.activations', 'a')
            .addSelect('CAST(COUNT(a.id) AS int)', 'activation_count')
            .where('pc.id = :id', {id})
            .groupBy('pc.id')
            .getRawAndEntities();

        if (!entities[0]) return null;

        return Object.assign(entities[0], {activationCount: Number(raw[0].activation_count)});
    }

    async findByCodeWithLockAndActivationCount(code: string): Promise<PromoCodeDetail | null> {
        const {entities, raw} = await this.dbRepository
            .createQueryBuilder('pc')
            .addSelect(qb => qb
                .select('CAST(COUNT(a.id) AS int)')
                .from(ActivationEntity, 'a')
                .where('a.promoCodeId = pc.id'),
            'activation_count',
            )
            .where('pc.code = :code', {code})
            .setLock('pessimistic_write')
            .getRawAndEntities();

        if (!entities[0]) return null;

        return Object.assign(entities[0], {activationCount: Number(raw[0].activation_count)});
    }

    async existsByCode(code: string): Promise<boolean> {
        return this.dbRepository.existsBy({code});
    }
}