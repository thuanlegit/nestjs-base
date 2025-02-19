import { IsInt, IsString } from 'class-validator';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { User } from './user.model';

@Table({ tableName: 'post', schema: 'public' })
export class Post extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @IsString()
  @Column
  title!: string;

  @IsString()
  @Column
  content!: string;

  @ForeignKey(() => User)
  @IsInt()
  @Column
  userId!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => User, 'userId')
  user!: User;
}
