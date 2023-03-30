import { Field, Int, ObjectType } from '@nestjs/graphql';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

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
  verification: Relation<Verification>;

  @BeforeInsert()
  hashPassword(): void {
    this.password = hashSync(this.password, genSaltSync());
  }

  compoarePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}

@Entity('verification')
@ObjectType()
export class Verification {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @OneToOne(() => User, (user) => user.verification, { cascade: true })
  @JoinColumn({ name: 'user_id' })
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
