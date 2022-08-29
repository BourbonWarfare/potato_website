import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: number;

  @Column({ unique: true })
  username: string;
}
