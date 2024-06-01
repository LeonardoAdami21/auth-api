import { Module } from '@nestjs/common';
import { AlbunsService } from './albuns.service';
import { AlbunsController } from './albuns.controller';
import { PrismaClient } from '@prisma/client';
import { AlbunsRepository } from './prisma/albuns.repository';

@Module({
  controllers: [AlbunsController],
  providers: [AlbunsService, {
    provide: 'dbClient',
    useValue: new PrismaClient(),
  },{
    provide: 'albuns__repository',
    useClass: AlbunsRepository,
  }],
})
export class AlbunsModule {}
