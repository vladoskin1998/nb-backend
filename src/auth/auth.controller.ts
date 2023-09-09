import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './google-auth.guard';
import { AuthDto } from './auth.dto';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private configService: ConfigService
  ) { }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(): Promise<any> { }

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const payload = await this.authService.messengerLogin(req.user as any);
    // console.log('refreshToken', payload.refreshToken);

    res.cookie('refreshToken', payload.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // return res.redirect('https://nb-nb.onrender.com');
    // return res.redirect('http://localhost:3000');
    return res.redirect(this.configService.get('CALL_BACK_URL_WEB_APP'));
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> { }

  @Get('facebook-redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const payload = await this.authService.messengerLogin(req.user as any);
    // console.log('refreshToken', payload.refreshToken);

    res.cookie('refreshToken', payload.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    
    //return res.redirect('https://nb-nb.onrender.com');
    return res.redirect(this.configService.get('CALL_BACK_URL_WEB_APP'));
  }


  @Post('registration')
  async registration(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.registration(authDto);

    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return result;
  }

  @Post('login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(authDto);
    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return result;
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req?.cookies;
    const result = await this.authService.refresh(refreshToken);
    res.cookie('refreshToken', result.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return result;
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { refreshToken } = req.cookies;
    await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    return 'LOGOUT';
  }
}
