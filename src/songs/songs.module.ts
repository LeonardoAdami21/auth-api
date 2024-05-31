import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SongRepository } from './prisma/song.repository';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { JwtStrategy } from '../guards/jwt.strategy';

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    JwtStrategy,
    {
      provide: 'song__repository',
      useClass: SongRepository,
    },
    {
      provide: 'dbClient',
      useClass: PrismaClient,
    }
  ],
})
export class SongsModule {}
