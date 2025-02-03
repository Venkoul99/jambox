import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  article: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  shortContent: string;

  @Column()
  image: string;
}
