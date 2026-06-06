import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  IsDate,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventType } from '../entities/event.entity';

export class CreateEventDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MaxLength(150, { message: 'O nome não pode ter mais de 150 caracteres.' })
  name: string;

  @IsString({ message: 'A descrição deve ser um texto.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;

  @IsInt({
    message: 'A quantidade máxima de participantes deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'O evento precisa ter espaço para pelo menos 1 participante.',
  })
  maxParticipants: number;

  @IsEnum(EventType, {
    message: 'O tipo de evento deve ser PHYSICAL ou VIRTUAL.',
  })
  @IsNotEmpty({ message: 'O tipo do evento é obrigatório.' })
  type: EventType;

  @IsNotEmpty({ message: 'A data de início é obrigatória.' })
  @Type(() => Date)
  @IsDate({ message: 'Forneça uma data de início válida.' })
  startDate: Date;

  @IsNotEmpty({ message: 'A data de término é obrigatória.' })
  @Type(() => Date)
  @IsDate({ message: 'Forneça uma data de término válida.' })
  endDate: Date;

  @IsString({ message: 'O local deve ser um texto.' })
  @IsNotEmpty({ message: 'O local ou nome da plataforma é obrigatório.' })
  @MaxLength(100, { message: 'O local não pode ter mais de 100 caracteres.' })
  location: string;

  // --- VALIDAÇÕES CONDICIONAIS ---

  // Só exige endereço se o tipo do evento for PHYSICAL
  @ValidateIf((objeto) => objeto.type === EventType.PHYSICAL)
  @IsNotEmpty({
    message: 'O endereço físico é obrigatório para eventos presenciais.',
  })
  @IsString()
  address?: string;

  // Só exige link se o tipo do evento for VIRTUAL
  @ValidateIf((objeto) => objeto.type === EventType.VIRTUAL)
  @IsNotEmpty({
    message: 'O link da reunião é obrigatório para eventos virtuais.',
  })
  @IsUrl(
    {},
    { message: 'Forneça um link válido (ex: https://meet.google.com/...)' },
  )
  meetingUrl?: string;
}
