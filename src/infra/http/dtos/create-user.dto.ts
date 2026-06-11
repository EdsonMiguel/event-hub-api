import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome e obrigatorio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O username e obrigatorio' })
  @Matches(/^[a-z0-9_-]+$/, {
    message:
      'O username deve conter apenas letras minusculas, numeros, hifens ou underlines sem espacos',
  })
  username: string;

  @IsEmail({}, { message: 'Forneca um e-mail valido' })
  @IsNotEmpty({ message: 'O e-mail e obrigatorio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha e obrigatoria' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
