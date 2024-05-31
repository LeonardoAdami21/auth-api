import { Playlist } from "@prisma/client";
import { CreatePlaylistDto } from "../dto/create-playlist.dto";

export interface PlaylistRepositoryInterface {
  create(dto: CreatePlaylistDto, userId: string)
  findAll(): Promise<any>;
  findPlaylistById(id: string): Promise<any>;
  update(id: string, dto: any): Promise<any>;
  delete(id: string): Promise<any>;
  findPlaylistByUserId(userId: string)
}
