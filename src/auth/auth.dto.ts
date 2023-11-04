import { IsString, IsEmail, IsOptional, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { METHOD_FORGET_PASSWORD, METHOD_REGISTRATION, ROLES } from 'src/enum/enum';

export class EmailDTO {
  @IsEmail()
  email: string;
}


export class AuthDto extends EmailDTO {

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


export class ConfirmCodeEmailDTO extends EmailDTO {

  @IsNumber()
  code: number
}


export class RegenerateCodeEmailDTO extends EmailDTO {


  @IsEnum(METHOD_FORGET_PASSWORD)
  sendMethod: METHOD_FORGET_PASSWORD
}


export class ChangePAsswordDTO extends EmailDTO {
  @IsOptional()
  @IsString()
  oldPassword?: string

  @IsOptional()
  @IsString()
  hashPassword?: string

  @IsString()
  newPassword: string
}