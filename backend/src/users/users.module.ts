import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule], // importado o modulo PrismaModule
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Expõe o UsersService para o AuthModule
})

export class UsersModule { }
