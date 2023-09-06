import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { METHOD_REGISTRATION, ROLES } from 'src/enum/enum';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(ROLES)
  @IsOptional()
  role?: ROLES = ROLES.USER;

  @IsEnum(METHOD_REGISTRATION)
  @IsOptional()
  methodRegistration?: METHOD_REGISTRATION = METHOD_REGISTRATION.JWT;
}
