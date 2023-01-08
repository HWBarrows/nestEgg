import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnerService } from './owner/owner.service';
import { OwnerModule } from './owner/owner.module';
import { SpendService } from './spend/spend.service';
import { SpendModule } from './spend/spend.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import config from './db/config';

@Module({
  controllers: [AppController],
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    OwnerModule,
    SpendModule,
    AuthModule,
    AccountModule,
  ],
  providers: [AppService, OwnerService, SpendService, AuthService, JwtService, AccountService],
})
export class AppModule {}
