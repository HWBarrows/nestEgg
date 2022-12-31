import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
//import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { OwnerService } from '../owner/owner.service';
//import { Owner, OwnerDocument } from '../owner/owner';
import { LoginOwnerDTO } from '../owner/dto/loginOwner.dto';

@Injectable()
export class AuthService {
  constructor(private readonly ownerService: OwnerService) {}

  async validateUser(
    email: LoginOwnerDTO['email'],
    password: LoginOwnerDTO['password'],
  ) {
    const validUser = await this.ownerService.findOne(email);
    console.log(validUser);
    try {
      const validPass = await argon2.verify(validUser.password, password);
      if (validPass) {
        return validUser;
      }
      throw new UnauthorizedException();
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
