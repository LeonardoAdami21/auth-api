import { PartialType } from '@nestjs/swagger';
import { CreateAlbunDto } from './create-albun.dto';

export class UpdateAlbunDto extends PartialType(CreateAlbunDto) {}
