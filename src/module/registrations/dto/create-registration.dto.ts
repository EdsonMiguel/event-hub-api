import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRegistrationDto {
  @IsNotEmpty({ message: 'O ID do evento é obrigatório.' })
  @IsUUID('4', { message: 'O ID do evento deve ser um UUID válido.' })
  eventId: string;
}
