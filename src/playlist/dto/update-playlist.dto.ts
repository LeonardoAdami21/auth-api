import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlaylistDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
