import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Consumer, Kafka, logLevel, Producer } from 'kafkajs';

export const NOVOS_FILMES_TOPIC = 'novos-filmes';

export interface NovoFilmeEvent {
  filmeId: number;
  titulo: string;
  genero: string;
  classificacaoIndicativa: string;
  dataEstreia: string;
  criadoEm: string;
}

@Injectable()
export class KafkaService implements OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private readonly kafka: Kafka;
  private producer: Producer;
  private producerConnected = false;
  private readonly consumers: Consumer[] = [];
  private isShuttingDown = false;

  constructor() {
    const brokers = (process.env.KAFKA_BROKER || 'localhost:9094')
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    this.kafka = new Kafka({
      clientId: 'cinema-backend',
      brokers,
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 500,
        retries: 10,
      },
    });

    this.producer = this.kafka.producer();
  }

  private async ensureProducerConnected(): Promise<void> {
    if (this.producerConnected) return;
    await this.producer.connect();
    this.producerConnected = true;
    this.logger.log('Producer Kafka conectado.');
  }

  async publish(topic: string, payload: unknown, key?: string): Promise<void> {
    await this.ensureProducerConnected();
    await this.producer.send({
      topic,
      messages: [
        {
          key: key ?? undefined,
          value: JSON.stringify(payload),
        },
      ],
    });
    this.logger.log(`Mensagem publicada no tópico "${topic}"`);
  }

  async subscribe(
    topic: string,
    groupId: string,
    handler: (value: string) => Promise<void>,
  ): Promise<void> {
    const consumer = this.kafka.consumer({ groupId });
    this.consumers.push(consumer);

    const connectWithRetry = async () => {
      while (!this.isShuttingDown) {
        try {
          const admin = this.kafka.admin();
          await admin.connect();
          await admin.createTopics({
            waitForLeaders: true,
            topics: [{ topic, numPartitions: 1, replicationFactor: 1 }],
          });
          await admin.disconnect();

          await consumer.connect();
          await consumer.subscribe({ topic, fromBeginning: false });
          await consumer.run({
            eachMessage: async ({ message }) => {
              if (!message.value) return;
              try {
                await handler(message.value.toString('utf-8'));
              } catch (err) {
                this.logger.error(
                  `Erro ao processar mensagem do tópico "${topic}":`,
                  err instanceof Error ? err.stack : String(err),
                );
              }
            },
          });

          this.logger.log(
            `Consumer Kafka escutando o tópico "${topic}" (group: ${groupId}).`,
          );
          return;
        } catch (err) {
          this.logger.warn(
            `Kafka indisponível para o consumer "${topic}", tentando novamente em 5s... (${err instanceof Error ? err.message : String(err)})`,
          );
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
    };

    void connectWithRetry();
  }

  async onModuleDestroy(): Promise<void> {
    this.isShuttingDown = true;
    if (this.producerConnected) {
      await this.producer.disconnect().catch(() => undefined);
    }
    for (const consumer of this.consumers) {
      await consumer.disconnect().catch(() => undefined);
    }
  }
}
