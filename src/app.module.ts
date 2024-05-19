import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';
import { PlaylistModule } from './playlist/playlist.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, SongsModule, PlaylistModule],
})
export class AppModule {}
