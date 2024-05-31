import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/role.strategy';
import { Role } from '../guards/role.guard';
import { enumRole } from '@prisma/client';

@Controller('playlist')
@ApiTags('Playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(enumRole.USER)
  async createPlaylist(
    @Body() dto: CreatePlaylistDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.playlistService.create(dto, req.user.id);
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
