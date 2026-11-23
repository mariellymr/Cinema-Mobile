import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  KafkaService,
  NOVOS_FILMES_TOPIC,
  NovoFilmeEvent,
} from '../kafka/kafka.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmesService {
  private readonly logger = new Logger(FilmesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
  ) { }

  async create(createFilmeDto: CreateFilmeDto) {
    const filme = await this.prisma.filme.create({
      data: createFilmeDto,
    });

    const evento: NovoFilmeEvent = {
      filmeId: filme.id,
      titulo: filme.titulo,
      genero: filme.genero,
      classificacaoIndicativa: filme.classificacaoIndicativa,
      dataEstreia: filme.dataEstreia.toISOString(),
      criadoEm: new Date().toISOString(),
    };

    try {
      await this.kafka.publish(NOVOS_FILMES_TOPIC, evento, String(filme.id));
    } catch (err) {
      this.logger.error(
        `Filme #${filme.id} salvo, mas falhou ao publicar no Kafka:`,
        err instanceof Error ? err.message : String(err),
      );
    }

    return filme;
  }

  findAll() {
    return this.prisma.filme.findMany();
  }

  findOne(id: number) {
    return this.prisma.filme.findUnique({
      where: { id },
    });
  }

  update(id: number, updateFilmeDto: UpdateFilmeDto) {
    return this.prisma.filme.update({
      where: { id },
      data: updateFilmeDto,
    });
  }

  remove(id: number) {
    return this.prisma.filme.delete({
      where: { id },
    });
  }
}

