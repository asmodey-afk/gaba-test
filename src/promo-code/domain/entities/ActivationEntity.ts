import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
} from 'typeorm';
import {PromoCodeEntity} from './PromoCodeEntity';

@Entity('activations')
@Index('UQ_activations_promo_code_email', ['promoCodeId', 'email'], {unique: true})
export class ActivationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'promo_code_id', type: 'int'})
    promoCodeId: number;

    @ManyToOne(
        () => PromoCodeEntity,
        (promoCode) => promoCode.activations,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({name: 'promo_code_id'})
    promoCode: PromoCodeEntity;

    @Column({type: 'varchar', length: 255})
    email: string;

    @CreateDateColumn({name: 'activated_at', type: 'timestamptz'})
    activatedAt: Date;
}
