import { Test, TestingModule } from '@nestjs/testing';
import { AlbunsController } from './albuns.controller';
import { AlbunsService } from './albuns.service';

describe('AlbunsController', () => {
  let controller: AlbunsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbunsController],
      providers: [AlbunsService],
    }).compile();

    controller = module.get<AlbunsController>(AlbunsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
