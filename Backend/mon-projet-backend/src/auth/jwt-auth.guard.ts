import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const token = req.cookies['auth_token'];
    if (!token) return false;
    try {
      req.user = this.jwt.verify(token);
      return req.user.role === 'owner';
    } catch {
      return false;
    }
  }
}
