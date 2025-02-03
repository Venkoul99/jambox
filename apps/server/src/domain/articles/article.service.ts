import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) { }

  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  findOne(id: number): Promise<Article> {
    return this.articleRepository.findOneBy({ id });
  }

  async create(createMenuItemDto: { article: string, content: string, shortContent?: string, image: string }): Promise<Article> {
    const newArticle = this.articleRepository.create(createMenuItemDto);
    return this.articleRepository.save(newArticle);
  }

  async update(id: number, updateArticleDto: { article: string; content: string; shortContent?: string; image: string }): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new Error('Article not found');
    }

    article.article = updateArticleDto.article;
    article.content = updateArticleDto.content;
    article.image = updateArticleDto.image;
    article.shortContent = updateArticleDto.shortContent;

    return this.articleRepository.save(article);
  }

  async remove(id: number): Promise<void> {
    const result = await this.articleRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Article not found or already deleted');
    }
  }
}
