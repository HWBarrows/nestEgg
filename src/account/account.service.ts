import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDTO } from './dto/createAccount.dto';
import { Account, AccountDocument } from './account';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async createAccount(newAccount: CreateAccountDTO): Promise<Account> {
    try {
      const account = new this.accountModel(newAccount);
      return account.save();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async getAccount(id: string): Promise<Account> {
    // Populating the Claim Document with the Insurances using the array of ObjectIDs
    const account = await this.accountModel.findById(id).populate({
      path: 'activities',
    });
    return account;
  }
}
