import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class UserEntity {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 60, unique: true })
  email: string;

  @ApiProperty()
  @Column({ length: 30 })
  password: string;

  @ApiProperty({ required: false })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({ required: false })
  @CreateDateColumn()
  createdAt: Date;
}
