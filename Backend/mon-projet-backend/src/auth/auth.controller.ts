import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Res,
  Patch,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateVisualsDto } from './dto/update-visuals.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(body.password);
    if (!token) throw new UnauthorizedException();

    res.cookie('auth_token', token, {
      httpOnly: true, // inaccessible au JS → protège du XSS
      secure: true, // HTTPS uniquement en prod
      sameSite: 'strict', // protège du CSRF
      maxAge: 4 * 60 * 60 * 1000,
    });
    return { ok: true };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token');
    return { ok: true };
  }
  @Patch('site/visuals')
  @UseGuards(JwtAuthGuard) // ← bloque tout le monde sauf le propriétaire
  async updateVisuals(@Body() dto: UpdateVisualsDto) {
    // sauvegarde en base ou dans un fichier JSON
  }
}
