import { Field, Int, ObjectType } from '@nestjs/graphql';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Verification } from '../auth/auth.entity';

@Entity('user')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ default: false, name: 'is_admin' })
  @Field(() => Boolean)
  isAdmin: boolean;

  @Column({ default: false, name: 'is_active' })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ length: 60, unique: true })
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ length: 50 })
  @Field(() => String)
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @OneToOne(() => Verification, (verification) => verification.user)
  verification: Verification;

  @BeforeInsert()
  hashPassword(): void {
    this.password = hashSync(this.password, genSaltSync());
  }

  compoarePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
