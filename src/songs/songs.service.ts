import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { SongRepositoryInterface } from './prisma/song.repository.interface';

@Injectable()
export class SongsService {
  constructor(
    @Inject('song__repository')
    private readonly songRepository: SongRepositoryInterface,
  ) {}

  async create(createSongDto: CreateSongDto, artistId: string) {
    try {
      const artist = await this.songRepository.findArtistById(artistId);
      if (!artist) {
        throw new NotFoundException('Artist not found');
      }
      const song = await this.songRepository.create({
        ...createSongDto,
        artistId,
      });
      return song;
    } catch (error) {
      throw new BadRequestException('Error creating song');
    }
  }

  async findAll() {
    return `This action returns all songs`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} song`;
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  async remove(id: string) {
    return `This action removes a #${id} song`;
  }
}
