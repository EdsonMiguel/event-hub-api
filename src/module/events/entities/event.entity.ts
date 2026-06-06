import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Ajuste o caminho conforme seu projeto
import { Registration } from 'src/module/registrations/entities/registration.entity';

// Definimos as únicas opções aceitas para o tipo de evento
export enum EventType {
  PHYSICAL = 'PHYSICAL',
  VIRTUAL = 'VIRTUAL',
}

@Entity('events')
export class Event {
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

  // Local físico ou plataforma (ex: "Centro de Convenções" ou "Google Meet")
  @Column({ length: 100 })
  location: string;

  // Endereço (Pode ser nulo se o evento for virtual)
  @Column({ nullable: true })
  address: string;

  // Link da sala virtual (Pode ser nulo se o evento for físico)
  @Column({ name: 'meeting_url', nullable: true })
  meetingUrl: string;

  // --- RELACIONAMENTO COM USUÁRIO ---
  // @ManyToOne = "Muitos" eventos podem ser criados por "Um" organizador
  @ManyToOne(() => User)
  @JoinColumn({ name: 'organizer_id' }) // Nome da coluna que ficará no banco de dados
  organizer: User;

  @OneToMany(() => Registration, (registration) => registration.event)
  registrations: Registration[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
