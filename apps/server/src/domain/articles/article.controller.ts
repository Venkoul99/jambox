import { Controller, Get, Param, Delete, Post, Body, Put } from '@nestjs/common';
import { ArticlesService } from './article.service';
import { Article } from './article.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticlesService) { }

  @Get()
  @Public()
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string): Promise<Article> {
    return this.articleService.findOne(+id);
  }

  @Post()
  create(
    @Body() createArticleDto: { article: string; content: string; shortContent?: string; image: string },
  ): Promise<Article> {
    return this.articleService.create(createArticleDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: { article: string; content: string; shortContent?: string; image: string },
  ): Promise<Article> {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.articleService.remove(+id);
  }
}
