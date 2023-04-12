import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { SigninInput, SignupInput, TokenType } from './auth.dto';
import { RefreshToken } from './auth.entity';
import fetch from 'node-fetch';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private repository: Repository<RefreshToken>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(input: SignupInput): Promise<TokenType> {
    const user = await this.usersService.createUser(input);
    const refreshTokenEntity = await this.repository.create({ user: user });
    const refreshToken = await this.repository.save(refreshTokenEntity);
    const payload = { username: user.username, sub: user.id, name: user.name };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: refreshToken.uuid,
    };
  }

  async signin(input: SigninInput): Promise<TokenType> {
    const user = await this.usersService.findOne(input.email);
    if (user && user.comparePassword(input.password)) {
      const payload = {
        username: user.username,
        sub: user.id,
        name: user.name,
      };
      const refreshToken = await this.repository.findOne({
        where: { user: { id: user.id } },
      });
      return {
        accessToken: this.jwtService.sign(payload),
        refreshToken: refreshToken.uuid,
      };
    }
  }

  async kakaoSignin(code: string): Promise<TokenType> {
    const queryString = Object.entries({
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_REST_KEY,
      code: code,
    })
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&');
    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString,
    });
    const { id_token } = await res.json();
    const { sub } = JSON.parse(atob(id_token.split('.')[1]));
    const user = await this.usersService.getOrCreateSocialUser(sub);
    const findToken = await this.repository.findOne({
      where: { user: { id: user.id } },
    });
    const refreshTokenEntity = findToken
      ? findToken
      : await this.repository.create({ user: user });
    const refreshToken = await this.repository.save(refreshTokenEntity);
    const payload = { username: user.username, sub: user.id, name: user.name };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: refreshToken.uuid,
    };
  }

  async tokenRefresh(uuid: string): Promise<TokenType> {
    const refreshToken = await this.repository.findOne({
      where: { uuid },
      relations: ['user'],
    });
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: this.jwtService.sign({
        username: refreshToken.user.username,
        sub: refreshToken.user.id,
        name: refreshToken.user.name,
      }),
      refreshToken: refreshToken.uuid,
    };
  }
}
