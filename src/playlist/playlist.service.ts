import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PlaylistRepositoryInterface } from './prisma/playlist.repository.interface';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject('playlist__repository')
    private readonly playlistRepository: PlaylistRepositoryInterface,
  ) {}

  async create(dto: CreatePlaylistDto, userId: string): Promise<any> {
    try {
      const user = await this.playlistRepository.findPlaylistByUserId(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const playlists = await this.playlistRepository.create(dto);
      return playlists;
    } catch (error) {
      throw new BadRequestException('Error to creating playlist');
    }
  }

  async findAll(): Promise<any> {
    try {
      const playlists = await this.playlistRepository.findAll();
      return playlists;
    } catch (error) {
      throw new InternalServerErrorException('Error to find playlists');
    }
  }

  async findPlaylistById(id: string): Promise<any> {
    try {
      const playlist = await this.playlistRepository.findPlaylistById(id);
      if (!playlist) {
        throw new NotFoundException('Playlist not found');
      }
      return playlist;
    } catch (error) {
      throw new InternalServerErrorException('Error to find playlist');
    }
  }

  async update(
    id: string,
    dto: UpdatePlaylistDto,
    userId: string,
  ): Promise<any> {
    try {
      const user = await this.playlistRepository.findPlaylistByUserId(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const playlist = await this.playlistRepository.findPlaylistById(id);
      if (!playlist) {
        throw new NotFoundException('Playlist not found');
      }
      const updatedPlaylist = await this.playlistRepository.update(id, dto);
      return updatedPlaylist;
    } catch (error) {
      throw new BadRequestException('Error to update playlist');
    }
  }

  async delete(id: string, userId: string): Promise<any> {
    try {
      const user = await this.playlistRepository.findPlaylistByUserId(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const playlist = await this.playlistRepository.findPlaylistById(id);
      if (!playlist) {
        throw new NotFoundException('Playlist not found');
      }
      await this.playlistRepository.delete(id);
      return { message: 'Playlist deleted successfully.' };
    } catch (error) {
      throw new BadRequestException('Error to delete playlist');
    }
  }
}
