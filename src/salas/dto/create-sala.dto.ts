import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ example: 'Sala 01', description: 'Nome da sala' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 120, description: 'Capacidade da sala' })
  @IsInt()
  @Min(1)
  capacidade: number;

  @ApiProperty({ example: '2D', description: 'Tipo da sala' })
  @IsString()
  @IsNotEmpty()
  tipo: string;
}
