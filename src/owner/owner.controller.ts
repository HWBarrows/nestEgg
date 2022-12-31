import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { AuthService } from '../auth/auth.service';
import { CreateOwnerDTO } from './dto/createOwner.dto';
import { Owner } from './owner';
import { LoginOwnerDTO } from './dto/loginOwner.dto';

@Controller('owner')
export class OwnerController {
  constructor(
    private ownerService: OwnerService,
    private authService: AuthService,
  ) {}

  @Get()
  async findAll(): Promise<Owner[]> {
    return await this.ownerService.findAll();
  }

  @Post()
  async create(@Body() body: CreateOwnerDTO): Promise<any> {
    const newOwner = await this.ownerService.createOwner(body);
    if (newOwner) {
      return HttpStatus.CREATED;
    }
    throw new HttpException(
      'Owner not created, please try again',
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('/login')
  async login(@Body() body: LoginOwnerDTO): Promise<any> {
    return await this.authService.validateUser(body.email, body.password);
  }
}
