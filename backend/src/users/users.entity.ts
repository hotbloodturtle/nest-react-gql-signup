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
import { RefreshToken } from '../auth/auth.entity';

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
  username: string;

  @Column({ length: 60, nullable: true })
  @Field(() => String)
  email: string;

  @Column({ nullable: true })
  @Field(() => String)
  password: string;

  @Column({ length: 50, nullable: true })
  @Field(() => String)
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt: Date;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.user, {
    nullable: true,
  })
  refreshToken: RefreshToken;

  @BeforeInsert()
  hashPassword(): void {
    if (this.password) {
      this.password = hashSync(this.password, genSaltSync());
    }
  }

  comparePassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
