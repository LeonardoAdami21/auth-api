import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './prisma/playlist.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PlaylistController],
  providers: [
    PlaylistService,
    {
      provide: 'playlist__repository',
      useClass: PlaylistRepository,
    },
    {
      provide: 'dbClient',
      useClass: PrismaClient,
    },
  ],
})
export class PlaylistModule {}
