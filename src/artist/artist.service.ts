import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepositoryInterface } from './prisma/artist.repository.inerface';
import * as bcrypt from 'bcrypt';
import { LoginArtistDto } from './dto/login-artist.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('artist__repository')
    private readonly artistRepository: ArtistRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async register(createArtistDto: CreateArtistDto) {
    try {
      const { email, name, password } = createArtistDto;
      const artist = await this.artistRepository.findArtistByEmail(email);
      if (artist) {
        throw new BadRequestException('Artist already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      if (password !== hashedPassword)
        throw new ConflictException('Password does not match');
      const newArtist = await this.artistRepository.create({
        email,
        name,
        password: hashedPassword,
      });

      return newArtist;
    } catch (error) {
      throw new BadRequestException('Error creating artist');
    }
  }

  async login(dto: LoginArtistDto) {
    try {
      const { email, password } = dto;
      const artist = await this.artistRepository.findArtistByEmail(email);
      if (!artist) {
        throw new BadRequestException('Artist does not exist');
      }
      const isPasswordMatch = await bcrypt.compare(password, artist.password);
      if (!isPasswordMatch) {
        throw new BadRequestException('Invalid password');
      }
      const payload = { sub: artist.id };
      const token = this.jwtService.sign(payload);
      return { access_token: token };
    } catch (error) {
      throw new BadRequestException('Error logging in artist');
    }
  }

  async findAll() {
    try {
      const artists = await this.artistRepository.findAll();
      return artists;
    } catch (error) {
      throw new InternalServerErrorException('Error get all artists');
    }
  }

  async findOne(id: string) {
    return `This action returns a #${id} artist`;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  async remove(id: string) {
    return `This action removes a #${id} artist`;
  }
}
