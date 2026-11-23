import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateSessoeDto {
  @ApiProperty({ example: '2026-09-05T20:00:00.000Z', description: 'Data e hora da sessão' })
  @IsDateString()
  dataHora: string;

  @ApiProperty({ example: 35.5, description: 'Preço da sessão' })
  @IsNumber()
  @Min(0)
  preco: number;

  @ApiProperty({ example: 'Legendado', description: 'Idioma da sessão' })
  @IsString()
  @IsNotEmpty()
  idioma: string;

  @ApiProperty({ example: '2D', description: 'Formato da sessão' })
  @IsString()
  @IsNotEmpty()
  formato: string;

  @ApiProperty({ example: 1, description: 'ID do filme da sessão' })
  @IsInt()
  @Min(1)
  filmeId: number;

  @ApiProperty({ example: 1, description: 'ID da sala da sessão' })
  @IsInt()
  @Min(1)
  salaId: number;
}
