import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbunDto {
  @ApiProperty()
  name: string;
}
