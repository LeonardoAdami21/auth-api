import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AlbunsService } from './albuns.service';
import { CreateAlbunDto } from './dto/create-albun.dto';
import { UpdateAlbunDto } from './dto/update-albun.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/role.strategy';
import { enumRole } from '@prisma/client';
import { Role } from '../guards/role.guard';

@Controller('albuns')
@ApiTags('Albuns')
export class AlbunsController {
  constructor(private readonly albunsService: AlbunsService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(enumRole.ARTIST)
  create(@Body() dto: CreateAlbunDto, @Request() req: { user: { id: string } }) {
    return this.albunsService.create(dto, req.user.id);
  }

  @Get()
  findAll() {
    return this.albunsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albunsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbunDto: UpdateAlbunDto) {
    return this.albunsService.update(id, updateAlbunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albunsService.remove(id);
  }
}
