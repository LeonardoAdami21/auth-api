import { CreateSongDto } from '../dto/create-song.dto';

export interface SongRepositoryInterface {
  create(dto: CreateSongDto, artistId: string): Promise<any>;
  findAll(): Promise<any>;
  findSongById(id: string): Promise<any>;
  findArtistById(id: string)
  update(id: string, dto: any): Promise<any>;
  delete(id: string): Promise<any>;
}
