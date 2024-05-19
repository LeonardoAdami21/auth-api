import { Inject, Injectable } from '@nestjs/common';
import { SongRepositoryInterface } from './song.repository.interface';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SongRepository implements SongRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  private readonly songRepository = this.dbClient.song;

  create(dto: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findSongById(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(id: number, dto: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
