import {
  Controller,
  Get,
  MessageEvent,
  Param,
  ParseIntPipe,
  Patch,
  Sse,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { NotificacoesService } from './notificacoes.service';

@ApiTags('notificacoes')
@Controller('notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar notificações de novos filmes' })
  @ApiResponse({ status: 200, description: 'Lista das últimas notificações.' })
  findAll() {
    return this.notificacoesService.findAll();
  }

  @Sse('stream')
  @ApiOperation({
    summary: 'Stream em tempo real (SSE) de notificações recebidas via Kafka',
  })
  stream(): Observable<MessageEvent> {
    return this.notificacoesService.getStream();
  }

  @Patch('ler-todas')
  @ApiOperation({ summary: 'Marcar todas as notificações como lidas' })
  marcarTodasComoLidas() {
    return this.notificacoesService.marcarTodasComoLidas();
  }

  @Patch(':id/lida')
  @ApiOperation({ summary: 'Marcar uma notificação específica como lida' })
  marcarComoLida(@Param('id', ParseIntPipe) id: number) {
    return this.notificacoesService.marcarComoLida(id);
  }
}
