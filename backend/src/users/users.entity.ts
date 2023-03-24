import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => Int, { description: 'pk' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'email' })
  @Column({ length: 60, unique: true })
  email: string;

  @Field(() => String, { description: 'password' })
  @Column({ length: 30 })
  password: string;

  @Field(() => String, { description: 'name' })
  @Column({ length: 50 })
  name: string;

  @Field(() => Date, { description: 'createdAt' })
  @CreateDateColumn()
  createdAt: Date;
}
