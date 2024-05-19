export interface SongRepositoryInterface {
  create(dto: any): Promise<any>;
  findAll(): Promise<any>;
  findSongById(id: string): Promise<any>;
  findArtistById(id: string): Promise<any>;
  update(id: string, dto: any): Promise<any>;
  delete(id: string): Promise<any>;
}
