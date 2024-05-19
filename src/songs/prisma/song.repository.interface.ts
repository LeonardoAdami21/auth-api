export interface SongRepositoryInterface {
  create(dto: any): Promise<any>;
  findAll(): Promise<any>;
  findSongById(id: number): Promise<any>;
  update(id: number, dto: any): Promise<any>;
  delete(id: number): Promise<any>;
}
