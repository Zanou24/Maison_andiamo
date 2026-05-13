import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async login(password: string): Promise<string | null> {
    const passwordHash = process.env.OWNER_PASSWORD_HASH;

    if (!passwordHash) {
      throw new Error('OWNER_PASSWORD_HASH environment variable is not set');
    }

    const valid = await bcrypt.compare(password, passwordHash);
    if (!valid) return null;
    return this.jwt.sign({ role: 'owner' });
  }
}
