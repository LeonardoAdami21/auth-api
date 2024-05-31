
import { Injectable } from '@nestjs/common';
import { environmentVariables } from '../env/envoriment';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, role: payload.role };
  }

  async validateArtist(payload: any) {
    return { id: payload.id, role: payload.role };
  }
}
