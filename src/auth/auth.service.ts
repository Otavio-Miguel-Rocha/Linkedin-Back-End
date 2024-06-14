import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, response } from 'express';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService) { }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await bcrypt.compare(pass, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }
    return await this.jwtService.signAsync({ sub: user.id, username: user.email })
  }
}
