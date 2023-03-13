import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 50 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
