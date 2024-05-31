import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PlaylistRepositoryInterface } from './playlist.repository.interface';
import { Playlist, PrismaClient } from '@prisma/client';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';

@Injectable()
export class PlaylistRepository implements PlaylistRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  private readonly playlistRepository = this.dbClient.playlist;

  async create(dto: CreatePlaylistDto, userId: string): Promise<any> {
    return await this.playlistRepository.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
  }

  async findAll(): Promise<any> {
    return this.playlistRepository.findMany();
  }

  async findPlaylistById(id: string): Promise<any> {
    return this.playlistRepository.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findPlaylistByUserId(userId: string): Promise<any> {
    const user = await this.dbClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }

  async update(id: string, dto: UpdatePlaylistDto): Promise<any> {
    return this.playlistRepository.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async delete(id: string): Promise<any> {
    return this.playlistRepository.delete({
      where: {
        id: id,
      },
    });
  }
}
