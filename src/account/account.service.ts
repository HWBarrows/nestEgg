import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDTO } from './dto/createAccount.dto';
import { Account, AccountDocument } from './account';
import { Owner, OwnerDocument } from '../owner/owner';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
  ) {}

  async createAccount(newAccount: CreateAccountDTO, id: string): Promise<any> {
    try {
      const account = new this.accountModel(newAccount);
      const owner = await this.ownerModel.findById(id);
      owner.accounts.push(account._id.toString());
      owner.save();
      return account;
    } catch (err) {
      throw new InternalServerErrorException((err) => err);
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
