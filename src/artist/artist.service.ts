import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtStrategy } from '../guards/jwt.strategy';
import { CreateArtistDto } from './dto/create-artist.dto';
import { LoginArtistDto } from './dto/login-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepositoryInterface } from './prisma/artist.repository.inerface';
import { environmentVariables } from '../env/envoriment';
import { enumRole } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('artist__repository')
    private readonly artistRepository: ArtistRepositoryInterface,
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async register(dto: CreateArtistDto) {
    try {
      const { email, name, password, role } = dto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const passwordConfirmation = await bcrypt.hash(password, hashedPassword);
      if (passwordConfirmation !== hashedPassword) {
        throw new UnprocessableEntityException('Error hashing password');
      }
      const newArtist = await this.artistRepository.create({
        email,
        name,
        password: hashedPassword,
        role: role || enumRole.ARTIST,
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
        throw new ConflictException('Invalid password');
      }
      const payload = await this.jwtStrategy.validateArtist({
        id: artist.id,
        role: artist.role,
      });
      const token = this.jwtService.sign(payload, {
        secret: environmentVariables.jwtSecret,
        expiresIn: '1d',
      });
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
