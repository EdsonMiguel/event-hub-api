import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventType } from '../../../domain/event-manager/event/entities/event-entity';
import { TypeOrmUserEntity } from './typeorm-user-entity';
import { TypeOrmRegistrationEntity } from './typeorm-registration-entity';

@Entity('events')
export class TypeOrmEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'max_participants', type: 'int' })
  maxParticipants: number;

  @Column({ type: 'enum', enum: EventType, default: EventType.PHYSICAL })
  type: EventType;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date' })
  endDate: Date;

  @Column({ length: 100 })
  location: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ name: 'meeting_url', nullable: true })
  meetingUrl?: string;

  @ManyToOne(() => TypeOrmUserEntity)
  @JoinColumn({ name: 'organizer_id' })
  organizer: TypeOrmUserEntity;

  @Column({ name: 'organizer_id' })
  organizerId: string;

  @OneToMany(
    () => TypeOrmRegistrationEntity,
    (registration) => registration.event,
  )
  registrations: TypeOrmRegistrationEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
