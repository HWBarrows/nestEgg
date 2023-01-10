import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { OwnerService } from '../owner/owner.service';
import { LoginOwnerDTO } from '../owner/dto/loginOwner.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private ownerService: OwnerService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: LoginOwnerDTO['email'],
    password: LoginOwnerDTO['password'],
  ) {
    const validUser = await this.ownerService.findOne(email);
    try {
      if (!validUser)
        throw new UnauthorizedException({ message: 'Invalid Credentials' });

      const validPass = await argon2.verify(validUser.password, password);

      if (!validPass)
        throw new UnauthorizedException({ message: 'Invalid Credentials' });
      return validUser;
    } catch (err) {
      throw err;
    }
  }

  async createToken(email: LoginOwnerDTO['email']) {
    const payload = { user: email, organization: 'hallieb.tech ' };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('auth.key'),
      }),
    };
  }

  async saveToken(email: LoginOwnerDTO['email']) {
    const token = (await this.createToken(email)).access_token;
    const owner = this.ownerService.getToken(email, token);
    return owner;
  }
}
