import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAlbunDto } from '../dto/create-albun.dto';
import { AlbunsRepositoryInterface } from './albuns.repository.inerface';

@Injectable()
export class AlbunsRepository implements AlbunsRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}
  private readonly artistRepository = this.dbClient.albuns;

  async create(dto: CreateAlbunDto, artistId: string) {
    return await this.artistRepository.create({
      data: {
        ...dto,
        artistId: artistId,
      },
    });
  }

  async findAll(): Promise<any> {
    return await this.artistRepository.findMany();
  }

  async findById(id: string): Promise<any> {
    return await this.artistRepository.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByArtistId(artistId: string): Promise<any> {
    return await this.dbClient.artist.findUnique({
      where: {
        id: artistId,
      },
    })

  }

  async update(id: string, dto: any): Promise<any> {
    return await this.artistRepository.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }

  async delete(id: string): Promise<any> {
    return await this.artistRepository.delete({
      where: {
        id: id,
      },
    });
  }
}
