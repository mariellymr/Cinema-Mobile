import { Injectable, Logger, MessageEvent, OnModuleInit } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import {
  KafkaService,
  NOVOS_FILMES_TOPIC,
  NovoFilmeEvent,
} from '../kafka/kafka.service';

@Injectable()
export class NotificacoesService implements OnModuleInit {
  private readonly logger = new Logger(NotificacoesService.name);
  private readonly stream$ = new Subject<MessageEvent>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.kafka.subscribe(
      NOVOS_FILMES_TOPIC,
      'cinema-notificacoes-group',
      async (rawMessage) => {
        const evento = JSON.parse(rawMessage) as NovoFilmeEvent;

        const notificacao = await this.prisma.notificacao.create({
          data: {
            titulo: `Novo filme: ${evento.titulo}`,
            mensagem: `${evento.titulo} (${evento.genero} • ${evento.classificacaoIndicativa}) acabou de chegar ao catálogo!`,
            filmeId: evento.filmeId,
          },
        });

        this.logger.log(
          `Notificação #${notificacao.id} salva e enviada em tempo real: ${notificacao.titulo}`,
        );

        this.stream$.next({ data: notificacao });
      },
    );
  }

  findAll() {
    return this.prisma.notificacao.findMany({
      orderBy: { criadaEm: 'desc' },
      take: 30,
    });
  }

  marcarComoLida(id: number) {
    return this.prisma.notificacao.update({
      where: { id },
      data: { lida: true },
    });
  }

  marcarTodasComoLidas() {
    return this.prisma.notificacao.updateMany({
      where: { lida: false },
      data: { lida: true },
    });
  }

  getStream(): Observable<MessageEvent> {
    return this.stream$.asObservable();
  }
}
