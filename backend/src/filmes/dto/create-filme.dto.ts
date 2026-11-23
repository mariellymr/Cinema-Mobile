import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateFilmeDto {
  @ApiProperty({ example: 'Duna: Parte 2', description: 'Título do filme' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Uma aventura épica no deserto', description: 'Descrição do filme' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 'Ação', description: 'Gênero do filme' })
  @IsString()
  @IsNotEmpty()
  genero: string;

  @ApiProperty({ example: '12', description: 'Classificação indicativa' })
  @IsString()
  @IsNotEmpty()
  classificacaoIndicativa: string;

  @ApiProperty({ example: 150, description: 'Duração em minutos' })
  @IsInt()
  @Min(1)
  duracaoMinutos: number;

  @ApiProperty({ example: '2026-12-25T00:00:00.000Z', description: 'Data de estreia' })
  @IsDateString()
  dataEstreia: string;
}
