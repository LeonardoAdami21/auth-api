import { Inject, Injectable } from '@nestjs/common';
import { AuthRepositoryInterface } from './auth.repository.interface';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
  constructor(@Inject('dbClient') private readonly dbClient: PrismaClient) {}

  private readonly authRepository = this.dbClient.user;

  async findUserByEmail(email: string): Promise<any> {
    return await this.authRepository.findUnique({
      where: {
        email: email,
      },
    });
  }
  async create(dto: RegisterUserDto): Promise<any> {
    return await this.authRepository.create({
      data: dto,
    });
  }
  async findAll() {
    return await this.authRepository.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
  findUserById(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(id: number, password: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
