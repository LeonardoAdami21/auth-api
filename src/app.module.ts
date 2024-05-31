import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ArtistModule } from './artist/artist.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { environmentVariables } from './env/envoriment';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    ArtistModule,
    SongsModule,
    PlaylistModule,
  ],
})
export class AppModule {}
