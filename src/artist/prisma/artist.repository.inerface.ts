import { CreateArtistDto } from '../dto/create-artist.dto';

export interface ArtistRepositoryInterface {
  create(dto: CreateArtistDto): Promise<any>;
  findAll(): Promise<any>;
  findArtistByEmail(email: string): Promise<any>;
  findArtistById(id: string): Promise<any>;
  update(id: string, dto: any): Promise<any>;
  delete(id: string): Promise<any>;
}
