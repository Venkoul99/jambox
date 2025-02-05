import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) { }

  findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  findOne(id: number): Promise<Artist> {
    return this.artistsRepository.findOneBy({ id });
  }

  async create(createMenuItemDto: { name: string }): Promise<Artist> {
    const newArtist = this.artistsRepository.create(createMenuItemDto);
    return this.artistsRepository.save(newArtist);
  }

  async update(id: number, updateArtistDto: { name: string; bio: string; shortBio?: string; image: string }): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new Error('Article not found');
    }

    artist.name = updateArtistDto.name;
    artist.bio = updateArtistDto.bio;
    artist.image = updateArtistDto.image;
    artist.shortBio = updateArtistDto.shortBio;

    return this.artistsRepository.save(artist);
  }


  async remove(id: number): Promise<void> {
    await this.artistsRepository.delete(id);
  }
}
