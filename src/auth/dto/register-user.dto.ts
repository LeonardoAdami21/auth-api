import { ApiProperty } from '@nestjs/swagger';
import { enumRole } from '@prisma/client';

export class RegisterUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  role?: enumRole
}
