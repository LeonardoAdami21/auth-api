import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbunDto } from './dto/create-albun.dto';
import { UpdateAlbunDto } from './dto/update-albun.dto';
import { AlbunsRepositoryInterface } from './prisma/albuns.repository.inerface';

@Injectable()
export class AlbunsService {
  constructor(
    @Inject('albuns__repository')
    private readonly albunsRepository: AlbunsRepositoryInterface,
  ) {}

  async create(dto: CreateAlbunDto, artistId: string) {
    try {
      const artist = await this.albunsRepository.findByArtistId(artistId);
      if (!artist) {
        throw new NotFoundException('Artist not found');
      }
      const albun = await this.albunsRepository.create(dto, artist.id);
      return albun;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    return `This action returns all albuns`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} albun`;
  }

  async update(id: string, updateAlbunDto: UpdateAlbunDto) {
    return `This action updates a #${id} albun`;
  }

  async remove(id: string) {
    return `This action removes a #${id} albun`;
  }
}
