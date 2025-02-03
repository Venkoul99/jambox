import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './domain/artists/Artist.entity';
import { Article } from './domain/articles/article.entity';
import { User } from './users/user.entity'
import { ArticleModule } from './domain/articles/article.module';
import { ArtistModule } from './domain/artists/artist.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'jambox_db',
      entities: [Article, Artist, User],
      synchronize: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ArticleModule,
    ArtistModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
