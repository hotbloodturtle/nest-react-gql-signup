import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.accessToken,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      usernameField: 'email',
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'HI I AM A SECRET KEY',
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
