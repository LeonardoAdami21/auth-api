import { Inject, Injectable } from '@nestjs/common';
import { ArtistRepositoryInterface } from './artist.repository.inerface';
import { PrismaClient } from '@prisma/client';
import { CreateArtistDto } from '../dto/create-artist.dto';

@Injectable()
export class ArtistRepository implements ArtistRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}
  private readonly artistRepository = this.dbClient.artist;

  async create(dto: CreateArtistDto): Promise<any> {
    return await this.artistRepository.create({
      data: dto,
    });
  }
  async findAll(): Promise<any> {
    return await this.artistRepository.findMany();
  }
  async findArtistById(id: string): Promise<any> {
    return await this.artistRepository.findUnique({
      where: {
        id: id,
      },
    });
  }
  async findArtistByEmail(email: string): Promise<any> {
    return await this.artistRepository.findFirst({
      where: {
        email: email,
      },
    });
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
