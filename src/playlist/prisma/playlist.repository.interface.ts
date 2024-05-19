export interface PlaylistRepositoryInterface {
  create(dto: any): Promise<any>;
  findAll(): Promise<any>;
  findPlaylistById(id: string): Promise<any>;
  update(id: string, dto: any): Promise<any>;
  delete(id: string): Promise<any>;
  findPlaylistByUserId(userId: string): Promise<any>;
}
