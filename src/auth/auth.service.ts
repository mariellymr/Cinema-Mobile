import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: number;
  email: string;
  name: string;
  role: string; // <-- 1. Tipagem atualizada com a role
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // Busca o usuário pelo e-mail
    const user = await this.usersService.findByEmail(loginDto.email);

    // Compara a senha digitada com o hash salvo no banco
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    // 2. Define o conteúdo do token incluindo a role e o nome
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role, // <-- Garante a role dentro do token JWT
    };

    // 3. Retorna o token e os dados essenciais para o React usar na hora
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}