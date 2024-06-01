import { CreateAlbunDto } from '../dto/create-albun.dto';

export interface AlbunsRepositoryInterface {
  create(dto: CreateAlbunDto, artistId: string): Promise<any>;
  findAll(): Promise<any>;
  findById(id: string): Promise<any>;
  findByArtistId(artistId: string): Promise<any>;
  update(id: string, dto: any): Promise<any>;
  delete(id: string): Promise<any>;
}
