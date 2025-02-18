export class UserDto {
  id!: number;
  email!: string;
  name!: string;

  static fields = ['id', 'email', 'name'];
}
