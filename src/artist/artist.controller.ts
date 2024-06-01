import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { LoginArtistDto } from './dto/login-artist.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/role.strategy';
import { Role } from '../guards/role.guard';
import { enumRole } from '@prisma/client';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post('register')
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.register(createArtistDto);
  }

  @Post('login')
  login(@Body() loginArtistDto: LoginArtistDto) {
    return this.artistService.login(loginArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(enumRole.ARTIST)
  @Put('/:songId/:albumId')
  setSongInAlbum(
    @Request() req: { user: { id: string } },
    @Param('albumId') albumId: string,
    @Param('songId') songId: string,
  ) {
    return this.artistService.setSongInAlbum(req.user.id, albumId, songId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
