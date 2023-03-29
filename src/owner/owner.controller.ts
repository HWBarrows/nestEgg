import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
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

  @Get()
  getOwner() {
    return { message: 'Hi everybody' };
  }
  @Post()
  async create(@Body() body: CreateOwnerDTO): Promise<any> {
    const newOwner = await this.ownerService.createOwner(body);
    if (newOwner) {
      return newOwner;
    }
    throw new HttpException('Owner not created', HttpStatus.BAD_REQUEST);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Body() body: LoginOwnerDTO): Promise<any> {
  //   const loginOwner = await this.authService.validateUser(
  //     body.email,
  //     body.password,
  //   );
  //   // user will receive a new JWT every time they successfully log in
  //   return this.authService.saveToken(loginOwner.email);
  // }

  // @UseGuards(JwtAuthGuard)
  @Get('/protected')
  async findAll(): Promise<Owner[]> {
    return await this.ownerService.findAll();
  }

  @Get(':id')
  async getOwnerById(@Param('id') id: string): Promise<Owner> {
    const owner = await this.ownerService.findOneById(id);
    return owner;
  }

  @Patch(':id')
  async updateOwnerInfo(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<Owner> {
    return await this.ownerService.updateOwner(id, req.body);
  }
}
