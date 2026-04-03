import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {ActivationEntity} from './ActivationEntity';

@Entity('promo_codes')
export class PromoCodeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({unique: true})
    @Column({type: 'varchar', length: 64})
    code: string;

    @Column({type: 'smallint'})
    discount: number;

    @Column({name: 'activation_limit', type: 'int'})
    activationLimit: number;

    @Column({name: 'expires_at', type: 'timestamptz'})
    expiresAt: Date;

    @OneToMany(
        () => ActivationEntity,
        (activation) => activation.promoCode
    )
    activations: ActivationEntity[];

    @CreateDateColumn({name: 'created_at', type: 'timestamptz'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamptz'})
    updatedAt: Date;
}