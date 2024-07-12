import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  first_name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  last_name: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  email: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  phone_number: string;

  // @ApiProperty()
  @Exclude()
  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at!: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at!: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deleted_at!: Date;
}
