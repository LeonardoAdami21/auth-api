import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './prisma/auth.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    {
      provide: 'dbClient',
      useClass: PrismaClient,
    },
    {
      provide: 'auth__repository',
      useClass: AuthRepository,
    },
    {
      provide: JwtService,
      useFactory: () => new JwtService(),
    },
  ],
})
export class AuthModule {}
