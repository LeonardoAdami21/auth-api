import { ApiProperty } from '@nestjs/swagger';

export class LoginArtistDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
