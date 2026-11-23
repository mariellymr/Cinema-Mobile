import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateIngressoDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do cliente' })
  @IsString()
  @IsNotEmpty()
  nomeCliente: string;

  @ApiProperty({ example: '12345678909', description: 'CPF do cliente' })
  @IsString()
  @IsNotEmpty()
  cpfCliente: string;

  @ApiProperty({ example: 'A10', description: 'Assento escolhido' })
  @IsString()
  @IsNotEmpty()
  assento: string;

  @ApiProperty({ example: 'Cartão', description: 'Tipo de pagamento' })
  @IsString()
  @IsNotEmpty()
  tipoPagamento: string;

  @ApiProperty({ example: 1, description: 'ID da sessão' })
  @IsInt()
  @Min(1)
  sessaoId: number;

  @ApiProperty({ example: 1, description: 'ID do usuário que comprou', required: false })
  @IsInt()
  @Min(1)
  userId?: number;
}
