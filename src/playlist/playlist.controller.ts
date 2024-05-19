import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('playlist')
@ApiTags('Playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('')
  async createPlaylist(
    @Body() dto: CreatePlaylistDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.playlistService.create(dto, req.user.userId);
  }

  @Get('')
  async findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  async findPlaylistById(id: string) {
    return this.playlistService.findPlaylistById(id);
  }

  @Patch(':id')
  async update(
    @Body() dto: any,
    @Request() req: { user: { userId: string } },
    id: string,
  ) {
    return this.playlistService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  async delete(@Request() req: { user: { userId: string } }, id: string) {
    return this.playlistService.delete(id, req.user.userId);
  }
}
