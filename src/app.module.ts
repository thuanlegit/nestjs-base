import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from '@/config';
import { DatabaseModule } from '@/db';
import { PostsModule } from '@/modules/posts/posts.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => config],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    RolesModule,
    PostsModule,
  ],
})
export class AppModule {}
