import { Inject, Injectable } from '@nestjs/common';
import { SongRepositoryInterface } from './song.repository.interface';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SongRepository implements SongRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  private readonly songRepository = this.dbClient.song;

  async create(dto: any): Promise<any> {
    return await this.songRepository.create({
      data: dto,
    });
  }
  async findAll(): Promise<any> {
    return await this.songRepository.findMany();
  }
  async findSongById(id: string): Promise<any> {
    return await this.songRepository.findUnique({
      where: {
        id: id,
      },
    });
  }
  async findArtistById(artistId: string): Promise<any> {
    return await this.songRepository.findMany({
      where: {
        artistId: artistId,
      },
    });
  }
  async update(id: string, dto: any): Promise<any> {
    return await this.songRepository.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }
  async delete(id: string): Promise<any> {
    return await this.songRepository.delete({
      where: {
        id: id,
      },
    });
  }
}
