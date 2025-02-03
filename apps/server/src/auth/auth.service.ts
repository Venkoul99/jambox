import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, id: user.id };
    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: 10_000_000 });
    let isAuthenticated = false;

    if (accessToken) {
      isAuthenticated = true;
    }

    return {
      accessToken: accessToken,
      username: payload.username,
      id: payload.id,
      isAuthenticated: isAuthenticated
    };
  }
}
