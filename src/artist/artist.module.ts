import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './prisma/artist.repository';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../guards/jwt.strategy';


@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    JwtService,
    JwtStrategy,
    {
      provide: 'artist__repository',
      useClass: ArtistRepository,
    },
    {
      provide: 'dbClient',
      useClass: PrismaClient,
    },
    {
      provide: JwtService,
      useFactory: () => new JwtService(),
    },
  ],
})
export class ArtistModule {}
