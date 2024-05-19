import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthRepositoryInterface } from './prisma/auth.repository.interface';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { environmentVariables } from '../env/envoriment';

@Injectable()
export class AuthService {
  constructor(
    @Inject('auth__repository')
    private readonly authRepository: AuthRepositoryInterface,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto) {
    try {
      const { email, password } = dto;
      const user = await this.authRepository.findUserByEmail(email);
      if (user) {
        throw new BadRequestException('User with this email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      if (password !== hashedPassword) {
        throw new UnprocessableEntityException('Error hashing password');
      }
      const newUser = await this.authRepository.create({
        ...dto,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(dto: LoginUserDto) {
    try {
      const { email, password } = dto;
      const user = await this.authRepository.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new ConflictException('Invalid password');
      }
      const payload = { sub: user.id };
      const token = this.jwtService.sign(payload, {
        secret: environmentVariables.jwtSecret,
        expiresIn: '1d',
      });
      return { access_token: token };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
