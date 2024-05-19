import { Module } from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { SongRepository } from './prisma/song.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: 'song__repository',
      useClass: SongRepository,
    },
    {
      provide: 'dbClient',
      useClass: PrismaClient,
    },
  ],
})
export class SongsModule {}
