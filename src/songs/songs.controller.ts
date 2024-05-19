import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('songs')
@ApiTags('Songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(
    @Body() createSongDto: CreateSongDto,
    @Request() req: { artist: { artistId: string } },
  ) {
    return this.songsService.create(createSongDto, req.artist.artistId);
  }

  @Get()
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
