import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Column, Default, IsNull, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'role', schema: 'public' })
export class Role extends Model {
  @PrimaryKey
  @IsUUID(4)
  @Column
  id!: string;

  @IsString()
  @Column
  name!: string;

  @IsString()
  @IsOptional()
  @IsNull
  @Column
  description?: string;

  @IsBoolean()
  @Default(true)
  @Column
  isActive!: boolean;
}
