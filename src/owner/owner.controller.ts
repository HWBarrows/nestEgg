import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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

  @Post()
  async create(@Body() body: CreateOwnerDTO): Promise<any> {
    const newOwner = await this.ownerService.createOwner(body);
    if (newOwner) {
      return HttpStatus.CREATED;
    }
    return { message: 'Owner not created' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: LoginOwnerDTO): Promise<any> {
    const loginOwner = await this.authService.validateUser(
      body.email,
      body.password,
    );
    // user will receive a new JWT every time they successfully log in
    return this.authService.saveToken(loginOwner.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  async findAll(): Promise<Owner[]> {
    return await this.ownerService.findAll();
  }
}
