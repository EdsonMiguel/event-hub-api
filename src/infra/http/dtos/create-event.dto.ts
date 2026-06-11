import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { EventType } from '../../../domain/event-manager/event/entities/event-entity';

export class CreateEventDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome e obrigatorio.' })
  @MaxLength(150, { message: 'O nome nao pode ter mais de 150 caracteres.' })
  name: string;

  @IsString({ message: 'A descricao deve ser um texto.' })
  @IsNotEmpty({ message: 'A descricao e obrigatoria.' })
  description: string;

  @IsInt({
    message: 'A quantidade maxima de participantes deve ser um numero inteiro.',
  })
  @Min(1, {
    message: 'O evento precisa ter espaco para pelo menos 1 participante.',
  })
  maxParticipants: number;

  @IsEnum(EventType, {
    message: 'O tipo de evento deve ser PHYSICAL ou VIRTUAL.',
  })
  @IsNotEmpty({ message: 'O tipo do evento e obrigatorio.' })
  type: EventType;

  @IsNotEmpty({ message: 'A data de inicio e obrigatoria.' })
  @Type(() => Date)
  @IsDate({ message: 'Forneca uma data de inicio valida.' })
  startDate: Date;

  @IsNotEmpty({ message: 'A data de termino e obrigatoria.' })
  @Type(() => Date)
  @IsDate({ message: 'Forneca uma data de termino valida.' })
  endDate: Date;

  @IsString({ message: 'O local deve ser um texto.' })
  @IsNotEmpty({ message: 'O local ou nome da plataforma e obrigatorio.' })
  @MaxLength(100, { message: 'O local nao pode ter mais de 100 caracteres.' })
  location: string;

  @ValidateIf((object) => object.type === EventType.PHYSICAL)
  @IsNotEmpty({
    message: 'O endereco fisico e obrigatorio para eventos presenciais.',
  })
  @IsString()
  address?: string;

  @ValidateIf((object) => object.type === EventType.VIRTUAL)
  @IsNotEmpty({
    message: 'O link da reuniao e obrigatorio para eventos virtuais.',
  })
  @IsUrl(
    {},
    { message: 'Forneca um link valido (ex: https://meet.google.com/...)' },
  )
  meetingUrl?: string;
}
