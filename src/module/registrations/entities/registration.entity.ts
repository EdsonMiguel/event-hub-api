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
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

export enum RegistrationStatus {
  CONFIRMED = 'CONFIRMED', // Inscrito e confirmado
  CANCELLED = 'CANCELLED', // O usuário desistiu de ir
  ATTENDED = 'ATTENDED', // Opcional: Se você quiser fazer "check-in" no dia do evento
}

@Entity('registrations')
// Garante no banco que a combinação de Usuário + Evento seja única!
@Unique('UQ_USER_EVENT', ['user', 'event'])
export class Registration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // --- RELACIONAMENTO COM USUÁRIO (Participante) ---
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // --- RELACIONAMENTO COM EVENTO ---
  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

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
