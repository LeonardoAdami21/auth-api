import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongsService } from './songs.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/role.strategy';
import { Role } from '../guards/role.guard';
import { enumRole } from '@prisma/client';

@Controller('songs')
@ApiTags('Songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(enumRole.ARTIST)
  create(
    @Body() createSongDto: CreateSongDto,
    @Request() req: { user: { id: string } },
  ) {
    console.log(req.user.id);
    return this.songsService.create(createSongDto, req.user.id);
  }

  @Get('')
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(id);
  }
}
