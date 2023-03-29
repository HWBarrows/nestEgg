import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
  }

  @Get(':id')
  async getAccount(@Param('id') id: string): Promise<any> {
    const foundAccount = await this.accountService.getAccount(id);
    if (foundAccount) {
      return foundAccount;
    }
    throw new HttpException('message', HttpStatus.BAD_REQUEST);
  }
}
