import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { Owner, OwnerDocument } from './owner';
import { CreateOwnerDTO } from './dto/createOwner.dto';
import { LoginOwnerDTO } from './dto/loginOwner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<OwnerDocument>,
  ) {}

  async findAll(): Promise<Owner[]> {
    return this.ownerModel.find().exec();
  }

  async createOwner(newOwner: CreateOwnerDTO): Promise<Owner> {
    const createdOwner = new this.ownerModel(newOwner);
    try {
      const hash = await argon2.hash(createdOwner.password);
      createdOwner.password = hash;
      createdOwner.authToken = '';
      createdOwner.save();
      return newOwner;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(loginEmail: LoginOwnerDTO['email']): Promise<Owner> {
    return await this.ownerModel.findOne({ email: loginEmail });
  }

  async getToken(
    email: LoginOwnerDTO['email'],
    payload: string,
  ): Promise<Owner> {
    try {
      const owner = await this.ownerModel.findOne({ email: email });
      owner.authToken = payload;
      owner.save();
      return owner;
    } catch (err) {
      throw err;
    }
  }
}
