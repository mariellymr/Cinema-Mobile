import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SalasModule } from './salas/salas.module';
import { FilmesModule } from './filmes/filmes.module';
import { SessoesModule } from './sessoes/sessoes.module';
import { IngressosModule } from './ingressos/ingressos.module';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';

@Module({
  imports: [
    PrismaModule,
    KafkaModule,
    UsersModule,
    SalasModule,
    FilmesModule,
    SessoesModule,
    IngressosModule,
    AuthModule,
    NotificacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
