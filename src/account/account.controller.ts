import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/createAccount.dto';

@UseGuards(JwtAuthGuard)
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  async create(@Body() body: CreateAccountDTO): Promise<any> {
    const newAccount = await this.accountService.createAccount(
      body,
      body.owner,
    );
    if (newAccount) {
      return newAccount;
    }
    throw new HttpException('message', HttpStatus.BAD_REQUEST);
    // throw new HttpException('Account not created, please try again', 400, {
    //   cause: new Error('user error'),
    // });
  }

  //   @UseGuards(LocalAuthGuard)
  //   @Post('/login')
  //   async login(@Body() body: LoginOwnerDTO): Promise<any> {
  //     const loginOwner = await this.authService.validateUser(
  //       body.email,
  //       body.password,
  //     );
  //     // user will receive a new JWT every time they successfully log in
  //     return this.authService.saveToken(loginOwner.email);
  //   }
}
