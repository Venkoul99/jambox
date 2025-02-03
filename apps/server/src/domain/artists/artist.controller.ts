import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './Artist.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) { }

  @Get()
  @Public()
  findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Artist> {
    return this.artistService.findOne(+id);
  }

  @Post()
  create(
    @Body() createArtistDto: { name: string; bio: string; shortBio?: string; image: string },
  ): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtistDto: { name: string; bio: string; shortBio?: string; image: string },
  ): Promise<Artist> {
    return this.artistService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.artistService.remove(+id);
  }
}
