import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  readonly lastName: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'
  })
  password: string

  @IsString()
  readonly phone: string
}
