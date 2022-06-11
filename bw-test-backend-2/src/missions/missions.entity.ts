import { User } from 'src/users/users.schema';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  text: string;

  @Column('text')
  url: string;

  @Column('text')
  type: string;

  @Column('text')
  category: string;

  @Column('array')
  author: User;

  @Column('array')
  comments: any;

  @Column('date')
  created: Date;

  @Column('number')
  view: number;
}
