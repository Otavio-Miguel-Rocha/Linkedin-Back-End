import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { signedCookie } from 'cookie-parser';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, string>, @Res({ passthrough: true }) response: Response) {
        try {
            const jwtToken = await this.authService.signIn(signInDto.email, signInDto.password);
            response.cookie("JWT", jwtToken, {
                expires: new Date(new Date().getTime() + 30 * 60 * 1000),  // 30 minutes
                sameSite: 'strict',
                httpOnly: true,
            });
            return { message: 'Login successful' };
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('E-mail e/ou Senha Inválidos');
            } else {
                throw error;
            }
        }
    }
}
