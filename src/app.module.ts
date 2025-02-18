import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from '@/config';

import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './db/database.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => config],
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}
