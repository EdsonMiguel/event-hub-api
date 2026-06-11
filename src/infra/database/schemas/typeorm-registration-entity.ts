import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { RegistrationStatus } from '../../../domain/event-manager/registration/entities/registration-entity';
import { TypeOrmEventEntity } from './typeorm-event-entity';
import { TypeOrmUserEntity } from './typeorm-user-entity';

@Entity('registrations')
@Unique('UQ_USER_EVENT', ['user', 'event'])
export class TypeOrmRegistrationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeOrmUserEntity)
  @JoinColumn({ name: 'user_id' })
  user: TypeOrmUserEntity;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => TypeOrmEventEntity)
  @JoinColumn({ name: 'event_id' })
  event: TypeOrmEventEntity;

  @Column({ name: 'event_id' })
  eventId: string;

  @Column({
    type: 'enum',
    enum: RegistrationStatus,
    default: RegistrationStatus.CONFIRMED,
  })
  status: RegistrationStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
