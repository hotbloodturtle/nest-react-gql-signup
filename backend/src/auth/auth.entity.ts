import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('refresh_token')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.refreshToken, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ type: 'datetime', name: 'expired_at', nullable: true })
  expiredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @BeforeInsert()
  createExpiredAt(): void {
    this.expiredAt = new Date();
    this.expiredAt.setDate(this.expiredAt.getDate() + 30);
  }
}
