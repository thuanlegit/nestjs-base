export class RoleDto {
  id!: string;
  name!: string;
  description?: string;
  isActive!: boolean;

  static fields = ['id', 'name', 'description', 'isActive'];
}
