import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('verification')
@ObjectType()
export class Verification {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @OneToOne(() => User, (user) => user.verification, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;

  @Column({ length: 20 })
  @Field(() => String)
  code: string;

  @UpdateDateColumn({ name: 'confirmed_at', nullable: true })
  @Field(() => Date)
  confirmedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @BeforeInsert()
  createCode(): void {
    this.code = Math.random().toString(10).substring(2, 8);
  }
}
