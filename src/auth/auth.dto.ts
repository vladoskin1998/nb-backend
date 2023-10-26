import { IsString, IsEmail, IsOptional, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { METHOD_REGISTRATION, ROLES } from 'src/enum/enum';

export class AuthDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;


  @IsEnum(ROLES)
  @IsOptional()
  role?: ROLES = ROLES.USER;

  @IsEnum(METHOD_REGISTRATION)
  @IsOptional()
  methodRegistration?: METHOD_REGISTRATION = METHOD_REGISTRATION.JWT;
}

export class RegistrationDto extends AuthDto {
  @IsString()
  fullName: string
}


export class ConfirmCodeEmailDTO {
  @IsEmail()
  email: string;

  @IsNumber()
  code: number
}


export class RegenerateCodeEmailDTO {
  @IsEmail()
  email: string;
}
