import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/auth', module: AuthModule },
      { path: '/users', module: UsersModule },
    ],
  },
];

@Module({
  imports: [RouterModule.register(routes), AuthModule, UsersModule],
})
export default class V1Module {}
