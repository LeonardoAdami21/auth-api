import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './prisma/artist.repository';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
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
